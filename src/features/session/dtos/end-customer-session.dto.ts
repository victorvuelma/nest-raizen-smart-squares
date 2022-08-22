export class EndCustomerSessionDto {
  customerId: string;

  constructor(customerId: string) {
    this.customerId = customerId;
  }
}
