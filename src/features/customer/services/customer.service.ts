import { Injectable } from '@nestjs/common';
import { CreateCustomerModel } from '../models/create-customer.model';

import { CustomerModel } from '../models/customer.model';
import { CustomerRepository } from '../repository/customer.repository';
import { CustomerValidator } from '../validators/customer.validator';

@Injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private customerValidator: CustomerValidator,
  ) {}

  async create(customer: Partial<CreateCustomerModel>): Promise<CustomerModel> {
    const validatedCustomer = this.customerValidator.validate(customer);

    return this.customerRepository.createCustomer(validatedCustomer);
  }
}
