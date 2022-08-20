import { AutoMap } from '@automapper/classes';

import { PartnerModel } from '../../partner/models/partner.model';

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

  @AutoMap()
  partner: PartnerModel;

  @AutoMap()
  createdAt: Date;
  @AutoMap()
  updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    cost: number,
    partner: PartnerModel,
    createdAt: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.cost = cost;
    this.partner = partner;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
