import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../../common/api-config/api-config.service';
import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(_apiConfig: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _apiConfig.jwtSecret,
    });
  }

  async validate(payload: AuthenticatedUserDto) {
    return {
      id: payload.sub,
      customerId: payload.customerId,
      username: payload.username,
      email: payload.email,
      name: payload.name,
    };
  }
}
