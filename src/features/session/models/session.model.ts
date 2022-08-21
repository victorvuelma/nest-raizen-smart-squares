import { AutoMap } from '@automapper/classes';
import { SessionStatus } from '@prisma/client';

export class SessionModel {
  @AutoMap()
  id: string;

  @AutoMap()
  startAt: Date;

  @AutoMap()
  endAt: Date | null;

  @AutoMap()
  points: number;

  @AutoMap()
  status: SessionStatus;

  @AutoMap()
  bicycleId: string;
  @AutoMap()
  customerId: string;

  constructor(
    id: string,
    startAt: Date,
    endAt: Date | null,
    points: number,
    status: SessionStatus,
    bicycleId: string,
    customerId: string,
  ) {
    this.id = id;
    this.startAt = startAt;
    this.endAt = endAt;
    this.points = points;
    this.status = status;
    this.bicycleId = bicycleId;
    this.customerId = customerId;
  }
}
