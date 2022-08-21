import { AutoMap } from '@automapper/classes';

import { OfferModel } from '../../offer/models/offer.model';

export class ActivationModel {
  @AutoMap()
  id: string;

  @AutoMap()
  when: Date;
  @AutoMap()
  code: string;

  @AutoMap()
  offerId: string;
  @AutoMap()
  offer: OfferModel;

  constructor(
    id: string,
    when: Date,
    code: string,
    offerId: string,
    offer: OfferModel,
  ) {
    this.id = id;
    this.when = when;
    this.code = code;
    this.offerId = offerId;
    this.offer = offer;
  }
}
