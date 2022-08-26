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

  get environment(): 'PRODUCTION' | 'DEVELOPMENT' {
    return this._configService.getOrThrow<'PRODUCTION' | 'DEVELOPMENT'>(
      'ENVIRONMENT',
    );
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

  get mqttHostname(): string {
    return this._configService.getOrThrow<string>('MQTT_HOST');
  }

  get mqttPassword(): string {
    return this._configService.getOrThrow<string>('MQTT_PASSWORD');
  }

  get mqttProtocol(): 'ssl' {
    return this._configService.getOrThrow<'ssl'>('MQTT_PROTOCOL');
  }

  get mqttProtocolVersion(): number {
    return this._configService.getOrThrow<number>('MQTT_PROTOCOL_VERSION');
  }

  get mqttPort(): number {
    return this._configService.getOrThrow<number>('MQTT_PORT');
  }

  get mqttUser(): string {
    return this._configService.getOrThrow<string>('MQTT_USER');
  }

  get port(): number {
    return this._configService.getOrThrow<number>('PORT');
  }

  get redisDb(): number {
    return this._configService.getOrThrow<number>('REDIS_DB');
  }

  get redisHost(): string {
    return this._configService.getOrThrow<string>('REDIS_HOST');
  }

  get redisPassword(): string {
    return this._configService.getOrThrow<string>('REDIS_PASSWORD');
  }

  get redisPort(): number {
    return this._configService.getOrThrow<number>('REDIS_PORT');
  }

  get redisTLS(): boolean {
    return this._configService.getOrThrow<boolean>('REDIS_TLS');
  }
}
