import { Gender } from '@prisma/client';

export interface CreateCustomerDto {
  email: string;
  password: string;

  cpf: string;

  name: string;

  phone: string | null;

  birthDate: Date;
  gender: Gender;
}
