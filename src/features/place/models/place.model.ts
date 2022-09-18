import { AutoMap } from '@automapper/classes';

export class PlaceModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
  @AutoMap()
  address: string;

  @AutoMap()
  lat: number;
  @AutoMap()
  lng: number;

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
    lat: number,
    lng: number,
    active: boolean,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.lat = lat;
    this.lng = lng;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
