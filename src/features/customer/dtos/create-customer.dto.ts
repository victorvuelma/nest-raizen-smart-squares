import { AutoMap } from '@automapper/classes';

export class CreateCustomerDto {
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;

  @AutoMap()
  cpf: string;

  @AutoMap()
  name: string;
  @AutoMap()
  phone: string | null;
  @AutoMap()
  birthDate: Date;

  constructor(
    email: string,
    password: string,
    cpf: string,
    name: string,
    phone: string,
    birthDate: Date,
  ) {
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.birthDate = birthDate;
  }
}
