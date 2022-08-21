import { AutoMap } from '@automapper/classes';

export class StartSessionDto {
  @AutoMap()
  customerId: string;

  @AutoMap()
  bicycleCode: string;

  constructor(customerId: string, bicycleCode: string) {
    this.customerId = customerId;
    this.bicycleCode = bicycleCode;
  }
}
