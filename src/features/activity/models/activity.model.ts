import { AutoMap } from '@automapper/classes';

export class ActivityModel {
  @AutoMap()
  id: string;

  @AutoMap()
  when: Date;

  @AutoMap()
  points: number;

  @AutoMap()
  potency: number;

  @AutoMap()
  cycles: number;

  @AutoMap()
  sessionId: string;

  constructor(
    id: string,
    when: Date,
    points: number,
    potency: number,
    cycles: number,
    sessionId: string,
  ) {
    this.id = id;
    this.when = when;
    this.points = points;
    this.potency = potency;
    this.cycles = cycles;
    this.sessionId = sessionId;
  }
}
