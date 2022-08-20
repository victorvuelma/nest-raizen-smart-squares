import { AutoMap } from '@automapper/classes';

export class AuthenticateCustomerDto {
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
