import { AutoMap } from '@automapper/classes';

import { OfferModel } from '../../offer/models/offer.model';

export class ActivationModel {
  @AutoMap()
  id: string;

  @AutoMap()
  when: Date;

  @AutoMap()
  offerId: string;
  @AutoMap()
  offer: OfferModel;

  constructor(id: string, when: Date, offerId: string, offer: OfferModel) {
    this.id = id;
    this.when = when;
    this.offerId = offerId;
    this.offer = offer;
  }
}
