import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { CustomerModule } from '../customer/customer.module';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { CustomerAuthStrategy } from './strategies/customer.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRES'),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerAuthStrategy, JwtStrategy],
})
export class AuthModule {}
