import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import { BcryptService } from '../../../common/infra/crypt/bcrypt.service';
import { CustomerMapper } from '../mappers/customer.mapper';
import { CreateCustomerModel } from '../models/create-customer.model';

import { CustomerModel } from '../models/customer.model';
import { CustomerRepository } from '../repository/customer.repository';
import { CustomerValidator } from '../validators/customer.validator';

@Injectable()
export class CustomerService {
  constructor(
    private _bcryptService: BcryptService,
    private _customerMapper: CustomerMapper,
    private _customerRepository: CustomerRepository,
    private _customerValidator: CustomerValidator,
  ) {}

  async create(
    craeteCustomer: Partial<CreateCustomerModel>,
  ): Promise<CustomerModel> {
    const validatedCustomer = this._customerValidator.validate(craeteCustomer);

    const hashedPassword = await this._bcryptService.hash(
      validatedCustomer.password,
    );
    validatedCustomer.password = hashedPassword;

    const customer = await this._customerRepository.create(validatedCustomer);
    const customerModel = this._customerMapper.mapper.map(
      customer,
      CustomerModel,
      CustomerModel,
    );

    return customerModel;
  }
}
