import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SessionStatus } from '@prisma/client';
import { Queue } from 'bull';
import dayjs from 'dayjs';
import sumBy from 'lodash/sumBy';

import { QUEUES } from '../../../common/infra/queue/queues';
import { BicycleService } from '../../bicycle/services/bicycle.service';
import { CustomerService } from '../../customer/services/customer.service';
import { CloseSessionDto } from '../dtos/close-session.dto';
import { EndCustomerSessionDto } from '../dtos/end-customer-session.dto';
import { StartSessionDto } from '../dtos/start-session.dto';
import { SessionGateway } from '../gateway/session.gateway';
import { SessionMapper } from '../mappers/session.mapper';
import { SessionModel } from '../models/session.model';
import { SessionDetailModel } from '../models/session-detail.model';
import { SessionRepository } from '../repository/session.repository';
import { SESSION_JOBS } from '../session.jobs';
import { SessionValidator } from '../validators/session.validator';

@Injectable()
export class SessionService {
  private readonly _logger = new Logger(SessionService.name);

  constructor(
    @InjectQueue(QUEUES.SESSION_QUEUE) private _sessionQueue: Queue,
    private _customerService: CustomerService,
    private _bicycleService: BicycleService,
    private _sessionGateway: SessionGateway,
    private _sessionMapper: SessionMapper,
    private _sessionRepository: SessionRepository,
    private _sessionValidator: SessionValidator,
  ) {}

  async get(sessionId: string): Promise<SessionModel> {
    const session = await this._sessionRepository.get({
      id: sessionId,
    });
    if (!session) {
      throw new BadRequestException('Session not found');
    }

    const sessionModel = this._sessionMapper.mapper.map(session, SessionModel);

    return sessionModel;
  }

  async start(data: Partial<StartSessionDto>): Promise<SessionModel> {
    const start = this._sessionValidator.validateStart(data);

    const [customer, bicycle] = await Promise.all([
      this._customerService.get(start.customerId),
      this._bicycleService.fromCode(start.bicycleCode),
    ]);

    const [customerSession, bicycleSession] = await Promise.all([
      this.findCustomerActiveSession(customer.id),
      this.findBicycleActiveSession(bicycle.id),
    ]);

    if (!!customerSession) {
      throw new BadRequestException(
        'Customer have an active session, please try again later.',
      );
    }

    if (!!bicycleSession) {
      throw new BadRequestException(
        'Bicycle have an active session, please try again later.',
      );
    }

    const session = await this._sessionRepository.create({
      bicycle: { connect: { id: bicycle.id } },
      customer: { connect: { id: customer.id } },
    });

    const sessionModel = this._sessionMapper.mapper.map(session, SessionModel);

    return sessionModel;
  }

  async endCustomerSession(
    data: Partial<EndCustomerSessionDto>,
  ): Promise<SessionModel> {
    const end = this._sessionValidator.validateEnd(data);

    const customer = await this._customerService.get(end.customerId);

    const customerSession = await this.findCustomerActiveSession(customer.id);
    if (!customerSession) {
      throw new BadRequestException(
        'Customer doesnt have an active session, please try again later.',
      );
    }

    const session = await this._sessionRepository.update({
      where: { id: customerSession.id },
      data: { status: SessionStatus.ENDING, endAt: new Date() },
    });

    await this._sessionQueue.add(
      SESSION_JOBS.PROCESS_CLOSE_SESSION,
      { sessionId: session.id },
      { delay: 5000 },
    );

    const sessionModel = this._sessionMapper.mapper.map(session, SessionModel);

    return sessionModel;
  }

  async closeSession(
    data: Partial<CloseSessionDto>,
  ): Promise<SessionModel | null> {
    const { sessionId, points } = this._sessionValidator.validateClose(data);

    const closedSession = await this._sessionRepository.update({
      where: { id: sessionId },
      data: {
        status: SessionStatus.CLOSED,
        points: points,
        endAt: new Date(),
      },
    });

    const detail = await this._sessionRepository.get({
      id: sessionId,
    });
    if (!detail) {
      return null;
    }

    const sessionDetail = {
      ...closedSession,
      cycles: sumBy(detail.activities, (a) => a.cycles),
      potency: sumBy(detail.activities, (a) => a.potency as any as number),
    };
    const sessionDetailModel = this._sessionMapper.mapper.map(
      sessionDetail,
      SessionDetailModel,
    );

    this._sessionGateway.notifySessionClose(sessionDetailModel);

    return sessionDetailModel;
  }

  async findCustomerActiveSession(
    customerId: string,
  ): Promise<SessionModel | undefined> {
    const sessions = await this._sessionRepository.find({
      where: {
        customerId: customerId,
        status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
      },
      take: 1,
    });
    if (!sessions.length) {
      return;
    }

    const sessionModel = this._sessionMapper.mapper.map(
      sessions[0],
      SessionModel,
    );

    return sessionModel;
  }

  async findBicycleActiveSession(
    bicycleId: string,
  ): Promise<SessionModel | undefined> {
    const sessions = await this._sessionRepository.find({
      where: {
        bicycleId: bicycleId,
        status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
      },
      take: 1,
    });

    if (!sessions.length) {
      return;
    }

    const sessionModel = this._sessionMapper.mapper.map(
      sessions[0],
      SessionModel,
    );

    return sessionModel;
  }

  @Cron('*/1 * * * *')
  async processInactiveSessions(): Promise<void> {
    const inactiveSessions = await this._sessionRepository.find({
      where: {
        status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
        createdAt: { lt: dayjs().subtract(2, 'minute').toDate() },
        activities: {
          none: {
            when: {
              gte: dayjs().subtract(2, 'minute').toDate(),
            },
          },
        },
      },
    });

    if (inactiveSessions.length > 0) {
      await this._sessionQueue.addBulk(
        inactiveSessions.map((session) => ({
          name: SESSION_JOBS.PROCESS_CLOSE_SESSION,
          data: { sessionId: session.id },
          opts: { delay: 5000 },
        })),
      );

      this._logger.log(
        `Added ${inactiveSessions.length} inactive sessions to close queue.`,
      );
    }
  }

  async updateSession(sessionId: string): Promise<SessionDetailModel | null> {
    const session = await this._sessionRepository.get({
      id: sessionId,
    });
    if (!session) {
      throw new BadRequestException('No session found with provided id');
    }

    if (session?.status == SessionStatus.STARTING) {
      await this._sessionRepository.update({
        where: { id: sessionId },
        data: { status: SessionStatus.RUNNING },
      });
    }

    const detail = await this._sessionRepository.get({
      id: sessionId,
    });
    if (!detail) {
      return null;
    }

    const sessionDetail = {
      ...detail,
      cycles: sumBy(detail.activities, (a) => a.cycles),
      potency: sumBy(detail.activities, (a) => a.potency as any as number),
    };
    const sessionDetailModel = this._sessionMapper.mapper.map(
      sessionDetail,
      SessionDetailModel,
    );

    this._sessionGateway.notifySessionUpdate(sessionDetailModel);

    return sessionDetailModel;
  }
}
