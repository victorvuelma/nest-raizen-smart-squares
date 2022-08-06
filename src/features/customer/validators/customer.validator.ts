import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { cpfRefineValidator } from '../../../common/utils/validators/cpf-refine.validator';

import { CreateCustomerModel } from '../models/create-customer.model';

@Injectable()
export class CustomerValidator {
  customerScheme = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    cpf: z.string().refine(cpfRefineValidator),
    birthDate: z.date(),
    phone: z.string().nullable(),
  });

  validate(customer: Partial<CreateCustomerModel>): CreateCustomerModel {
    const parsedCustomer = this.customerScheme.parse(customer);

    return parsedCustomer;
  }
}
