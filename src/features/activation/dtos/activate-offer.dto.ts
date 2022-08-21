import { AutoMap } from '@automapper/classes';

export class ActivateOfferDto {
  @AutoMap()
  customerId: string;

  @AutoMap()
  offerId: string;

  constructor(customerId: string, offerId: string) {
    this.customerId = customerId;
    this.offerId = offerId;
  }
}
