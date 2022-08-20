import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../service/auth.service';

@Injectable()
export class CustomerAuthStrategy extends PassportStrategy(
  Strategy,
  'Customer',
) {
  constructor(private _authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const customer = await this._authService.authenticateCustomer(
      username,
      password,
    );

    return customer;
  }
}
