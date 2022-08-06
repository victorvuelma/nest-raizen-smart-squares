import { AutoMap } from '@automapper/classes';

export class CustomerModel {
  @AutoMap()
  id: string;

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
    id: string,
    email: string,
    password: string,
    cpf: string,
    name: string,
    phone: string,
    birthDate: Date,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.birthDate = birthDate;
  }
}
