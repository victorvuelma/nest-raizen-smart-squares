import { AutoMap } from '@automapper/classes';

export class PlaceModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
  @AutoMap()
  address: string;

  @AutoMap()
  active: boolean;

  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    address: string,
    active: boolean,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
