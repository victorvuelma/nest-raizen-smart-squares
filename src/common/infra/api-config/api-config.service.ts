import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private _configService: ConfigService) {}

  get bcryptRounds(): number {
    return this._configService.getOrThrow<number>('BCRYPT_ROUNDS');
  }

  get databaseUrl(): string {
    return this._configService.getOrThrow<string>('DATABASE_URL');
  }

  get host(): string {
    return this._configService.getOrThrow<string>('HOST');
  }

  get jwtExpires(): number {
    return this._configService.getOrThrow<number>('JWT_EXPIRES');
  }

  get jwtSecret(): string {
    return this._configService.getOrThrow<string>('JWT_SECRET');
  }

  get port(): number {
    return this._configService.getOrThrow<number>('PORT');
  }
}
