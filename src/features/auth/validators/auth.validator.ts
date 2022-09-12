import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { AuthenticateUserDto } from '../dto/authenticate-customer.dto';

@Injectable()
export class AuthValidator {
  private _authenticateScheme = z.object({
    username: z.string().email(),
    password: z.string().min(1),
  });

  validateAuthenticate(
    data: Partial<AuthenticateUserDto>,
  ): AuthenticateUserDto {
    return this._authenticateScheme.parse(data);
  }
}
