import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiConfigService } from '../../../common/api-config/api-config.service';
import { AuthenticatedProfileDto } from '../dto/authenticated-profile.dto';
import { AuthenticatedSessionDto } from '../dto/authenticated-session.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'JWT') {
  constructor(_apiConfig: ApiConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _apiConfig.jwtSecret,
    });
  }

  async validate(
    payload: AuthenticatedSessionDto,
  ): Promise<AuthenticatedProfileDto> {
    return {
      id: payload.profile.id,
      username: payload.profile.username,
      email: payload.profile.email,
      name: payload.profile.name,
    };
  }
}
