import { AutoMap } from '@automapper/classes';

export class BicycleModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
  @AutoMap()
  code: string;

  constructor(id: string, name: string, code: string) {
    this.id = id;
    this.name = name;
    this.code = code;
  }
}
