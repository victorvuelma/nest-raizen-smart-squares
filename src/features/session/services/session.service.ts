import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionStatus } from '@prisma/client';

import { BicycleService } from '../../bicycle/services/bicycle.service';
import { CustomerService } from '../../customer/services/customer.service';
import { StartSessionDto } from '../dtos/start-session.dto';
import { SessionMapper } from '../mappers/session.mapper';
import { SessionModel } from '../models/session.model';
import { SessionRepository } from '../repository/session.repository';
import { SessionValidator } from '../validators/session.validator';

@Injectable()
export class SessionService {
  constructor(
    private _customerService: CustomerService,
    private _bicycleService: BicycleService,
    private _sessionMapper: SessionMapper,
    private _sessionRepository: SessionRepository,
    private _sessionValidator: SessionValidator,
  ) {}

  async start(start: Partial<StartSessionDto>): Promise<SessionModel> {
    const startSession = this._sessionValidator.validateStartSession(start);

    const [customer, bicycle] = await Promise.all([
      this._customerService.get(startSession.customerId),
      this._bicycleService.fromCode(startSession.bicycleCode),
    ]);

    const [customerSessions, bicycleSessions] = await Promise.all([
      this.findCustomerActiveSessions(customer.id),
      this.findBicycleActiveSessions(bicycle.id),
    ]);

    if (customerSessions.length > 0) {
      throw new BadRequestException(
        'Customer have an active session, please try again later.',
      );
    }

    if (bicycleSessions.length > 0) {
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

  async findCustomerActiveSessions(
    customerId: string,
  ): Promise<SessionModel[]> {
    const sessions = await this._sessionRepository.find({
      where: {
        customerId: customerId,
        AND: {
          status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
        },
      },
    });

    const sessionsModels = this._sessionMapper.mapper.mapArray(
      sessions,
      SessionModel,
    );

    return sessionsModels;
  }

  async findBicycleActiveSessions(bicycleId: string): Promise<SessionModel[]> {
    const sessions = await this._sessionRepository.find({
      where: {
        bicycleId: bicycleId,
        AND: {
          status: { in: [SessionStatus.RUNNING, SessionStatus.STARTING] },
        },
      },
    });

    const sessionsModels = this._sessionMapper.mapper.mapArray(
      sessions,
      SessionModel,
    );

    return sessionsModels;
  }
}
