import { AutoMap } from '@automapper/classes';

export class PartnerModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
  @AutoMap()
  description: string;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
