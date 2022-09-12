import { AuthenticatedProfileDto } from './authenticated-profile.dto';

export interface AuthenticatedSessionDto {
  sub: string;

  profile: AuthenticatedProfileDto;
}
