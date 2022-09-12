import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CustomerModel } from '../../customer/models/customer.model';
import { CustomerService } from '../../customer/services/customer.service';
import { AuthenticateUserDto } from '../dto/authenticate-customer.dto';
import { AuthenticatedResponseDto } from '../dto/authenticated-response.dto';
import { AuthenticatedSessionDto } from '../dto/authenticated-session.dto';
import { AuthValidator } from '../validators/auth.validator';

@Injectable()
export class AuthService {
  constructor(
    private _authValidator: AuthValidator,
    private _customerService: CustomerService,
    private _jwtService: JwtService,
  ) {}

  async authenticate(data: AuthenticateUserDto): Promise<CustomerModel> {
    const { username, password } =
      this._authValidator.validateAuthenticate(data);

    const customer = await this._customerService.auth({
      email: username,
      password,
    });

    return customer;
  }

  async login(customer: CustomerModel): Promise<AuthenticatedResponseDto> {
    const payload: AuthenticatedSessionDto = {
      sub: customer.id,
      profile: {
        id: customer.id,
        username: customer.email,
        name: customer.name,
        email: customer.email,
      },
    };

    const access_token = await this._jwtService.signAsync(payload);
    const session: AuthenticatedResponseDto = {
      access_token: access_token,
      ...payload,
    };

    return session;
  }
}
