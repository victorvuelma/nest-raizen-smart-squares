import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionStatus } from '@prisma/client';
import { Queue } from 'bull';

import { QUEUES } from '../../../common/infra/queue/queues';
import { BicycleService } from '../../bicycle/services/bicycle.service';
import { CustomerService } from '../../customer/services/customer.service';
import { CloseSessionDto } from '../dtos/close-session.dto';
import { EndCustomerSessionDto } from '../dtos/end-customer-session.dto';
import { StartSessionDto } from '../dtos/start-session.dto';
import { SessionMapper } from '../mappers/session.mapper';
import { SessionModel } from '../models/session.model';
import { SessionRepository } from '../repository/session.repository';
import { SessionValidator } from '../validators/session.validator';

@Injectable()
export class SessionService {
  constructor(
    @InjectQueue(QUEUES.SESSION_QUEUE) private _sessionQueue: Queue,
    private _customerService: CustomerService,
    private _bicycleService: BicycleService,
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
      'close-session',
      { sessionId: session.id },
      { delay: 5000 },
    );

    const sessionModel = this._sessionMapper.mapper.map(session, SessionModel);

    return sessionModel;
  }

  async closeSession(data: Partial<CloseSessionDto>): Promise<SessionModel> {
    const close = this._sessionValidator.validateClose(data);

    const session = await this.get(close.sessionId);

    const closedSession = await this._sessionRepository.update({
      where: { id: session.id },
      data: { status: SessionStatus.CLOSED, points: close.points },
    });
    const sessionModel = this._sessionMapper.mapper.map(
      closedSession,
      SessionModel,
    );

    return sessionModel;
  }

  async findCustomerActiveSession(
    customerId: string,
  ): Promise<SessionModel | undefined> {
    const sessions = await this._sessionRepository.find({
      where: {
        customerId: customerId,
        AND: {
          status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
        },
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
        AND: {
          status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
        },
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
}
