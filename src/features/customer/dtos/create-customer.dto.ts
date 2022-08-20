import { AutoMap } from '@automapper/classes';
import { Gender } from '@prisma/client';

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
  @AutoMap(() => String)
  gender: Gender;

  constructor(
    email: string,
    password: string,
    cpf: string,
    name: string,
    phone: string,
    birthDate: Date,
    gender: Gender,
  ) {
    this.email = email;
    this.password = password;
    this.cpf = cpf;
    this.name = name;
    this.phone = phone;
    this.birthDate = birthDate;
    this.gender = gender;
  }
}
