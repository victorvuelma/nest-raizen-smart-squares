import { Injectable } from '@nestjs/common';
import { Gender } from '@prisma/client';
import { z } from 'zod';

import { cpfRefineValidator } from '../../../common/utils/validators/cpf-refine.validator';
import { dateValidRefineValidator } from '../../../common/utils/validators/date-valid.validator';
import { AuthenticateCustomerDto } from '../dtos/authenticate-customer.dto';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Injectable()
export class CustomerValidator {
  private _createScheme = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    cpf: z.string().refine(cpfRefineValidator, 'Invalid value'),
    birthDate: z
      .string()
      .refine(dateValidRefineValidator, 'Invalid value')
      .transform((v) => new Date(v)),
    phone: z.string().nullable(),
    gender: z.nativeEnum(Gender),
  });

  private _authenticateScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  validateCreate(data: Partial<CreateCustomerDto>): CreateCustomerDto {
    return this._createScheme.parse(data);
  }

  validateAuthenticate(
    data: Partial<AuthenticateCustomerDto>,
  ): AuthenticateCustomerDto {
    return this._authenticateScheme.parse(data);
  }
}
