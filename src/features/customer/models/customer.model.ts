import { AutoMap } from '@automapper/classes';

export class CustomerModel {
  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  cpf: string;

  @AutoMap()
  name: string;
  @AutoMap()
  phone: string | null;
  @AutoMap()
  birthDate: Date;

  @AutoMap()
  points: number;

  constructor(
    id: string,
    email: string,
    cpf: string,
    name: string,
    phone: string,
    birthDate: Date,
    points: number,
  ) {
    this.id = id;
    this.email = email;
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.birthDate = birthDate;
    this.points = points;
  }
}
