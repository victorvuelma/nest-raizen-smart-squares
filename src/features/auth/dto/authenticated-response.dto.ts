import { AuthenticatedSessionDto } from './authenticated-session.dto';

export interface AuthenticatedResponseDto extends AuthenticatedSessionDto {
  access_token: string;
}
