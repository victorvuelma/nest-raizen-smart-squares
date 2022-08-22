import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomerModel } from '../../customer/models/customer.model';
import { CustomerService } from '../../customer/services/customer.service';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private _customerService: CustomerService,
    private _jwtService: JwtService,
  ) {}

  //TODO: RECEIVE AND VALIDATE DTO
  async authenticateCustomer(
    username: string,
    password: string,
  ): Promise<CustomerModel> {
    const customer = await this._customerService.auth({
      email: username,
      password,
    });

    return customer;
  }

  async login(customer: CustomerModel) {
    const payload: AuthenticatedUserDto = {
      sub: customer.id,
      customerId: customer.id,
      username: customer.email,
      name: customer.name,
      email: customer.email,
    };

    return {
      access_token: this._jwtService.sign(payload),
      ...customer,
    };
  }
}
