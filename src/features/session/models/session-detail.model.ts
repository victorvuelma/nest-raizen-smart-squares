import { AutoMap } from '@automapper/classes';
import { SessionStatus } from '@prisma/client';

import { SessionModel } from './session.model';

export class SessionDetailModel extends SessionModel {
  @AutoMap()
  cycles: number;

  @AutoMap()
  potency: number;

  constructor(
    id: string,
    startAt: Date,
    endAt: Date | null,
    points: number,
    status: SessionStatus,
    bicycleId: string,
    customerId: string,
    potency: number,
    cycles: number,
  ) {
    super(id, startAt, endAt, points, status, bicycleId, customerId);

    this.potency = potency;
    this.cycles = cycles;
  }
}
