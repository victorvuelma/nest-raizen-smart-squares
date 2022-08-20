import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../../common/infra/api-config/api-config.service';
import { AuthJwtPayload } from '../dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(_apiConfig: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _apiConfig.jwtSecret,
    });
  }

  async validate(payload: AuthJwtPayload) {
    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      name: payload.name,
    };
  }
}
