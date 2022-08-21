import { AutoMap } from '@automapper/classes';

import { PartnerModel } from '../../partner/models/partner.model';
import { OfferModel } from './offer.model';

export class OfferDetailsModel extends OfferModel {
  @AutoMap()
  partnerId: string;
  @AutoMap()
  partner: PartnerModel;

  constructor(
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    cost: number,
    partnerId: string,
    partner: PartnerModel,
  ) {
    super(id, name, description, imageUrl, cost);
    this.partnerId = partnerId;
    this.partner = partner;
  }
}
