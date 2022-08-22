export class StartSessionDto {
  customerId: string;

  bicycleCode: string;

  constructor(customerId: string, bicycleCode: string) {
    this.customerId = customerId;
    this.bicycleCode = bicycleCode;
  }
}
