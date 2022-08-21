import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { BcryptService } from '../../../common/infra/crypt/bcrypt.service';
import { AuthenticateCustomerDto } from '../dtos/authenticate-customer.dto';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { CustomerMapper } from '../mappers/customer.mapper';
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

  async get(customerId: string): Promise<CustomerModel> {
    const customer = await this._customerRepository.get({
      id: customerId,
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const customerModel = this._customerMapper.mapper.map(
      customer,
      CustomerModel,
    );

    return customerModel;
  }

  async auth(
    authenticate: Partial<AuthenticateCustomerDto>,
  ): Promise<CustomerModel> {
    const authenticateCustomer =
      this._customerValidator.validateAuthenticateCustomer(authenticate);

    const customer = await this._customerRepository.get({
      email: authenticateCustomer.email,
    });
    if (!customer) {
      throw new UnauthorizedException('Invalid username or password provided');
    }

    const customerPassword = customer.password;
    const passwordMatches = await this._bcryptService.compare(
      authenticateCustomer.password,
      customerPassword,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid username or password provided');
    }

    const customerModel = this._customerMapper.mapper.map(
      customer,
      CustomerModel,
    );

    return customerModel;
  }

  async create(create: Partial<CreateCustomerDto>): Promise<CustomerModel> {
    const createCustomer =
      this._customerValidator.validateCreateCustomer(create);

    const hashedPassword = await this._bcryptService.hash(
      createCustomer.password,
    );
    createCustomer.password = hashedPassword;

    const customer = await this._customerRepository.create(createCustomer);
    const customerModel = this._customerMapper.mapper.map(
      customer,
      CustomerModel,
    );

    return customerModel;
  }
}
