import { AutoMap } from '@automapper/classes';

export class PointsModel {
  @AutoMap()
  points: number;

  constructor(points: number) {
    this.points = points;
  }
}
