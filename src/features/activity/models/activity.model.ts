import { AutoMap } from '@automapper/classes';
import { Prisma } from '@prisma/client';

export class ActivityModel {
  @AutoMap()
  id: string;

  @AutoMap()
  when: Date;

  @AutoMap()
  points: number;

  @AutoMap()
  potency: Prisma.Decimal;

  @AutoMap()
  cycles: number;

  constructor(
    id: string,
    when: Date,
    points: number,
    potency: Prisma.Decimal,
    cycles: number,
  ) {
    this.id = id;
    this.when = when;
    this.points = points;
    this.potency = potency;
    this.cycles = cycles;
  }
}
