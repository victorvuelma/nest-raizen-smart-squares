import { Gender } from '@prisma/client';

export class CreateCustomerDto {
  email: string;
  password: string;

  cpf: string;

  name: string;

  phone: string | null;

  birthDate: Date;
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
