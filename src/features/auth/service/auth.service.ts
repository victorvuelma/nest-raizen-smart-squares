import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomerModel } from '../../customer/models/customer.model';
import { CustomerService } from '../../customer/services/customer.service';

@Injectable()
export class AuthService {
  constructor(
    private _customerService: CustomerService,
    private _jwtService: JwtService,
  ) {}

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
    const payload = {
      username: customer.email,
      name: customer.name,
      email: customer.email,
      sub: customer.id,
    };

    return {
      access_token: this._jwtService.sign(payload),
      ...customer,
    };
  }
}
