export class ActivateOfferDto {
  customerId: string;

  offerId: string;

  constructor(customerId: string, offerId: string) {
    this.customerId = customerId;
    this.offerId = offerId;
  }
}
