import { AutoMap } from '@automapper/classes';

export class OfferModel {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;
  @AutoMap()
  description: string;

  @AutoMap()
  imageUrl: string;

  @AutoMap()
  cost: number;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    cost: number,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.cost = cost;
  }
}
