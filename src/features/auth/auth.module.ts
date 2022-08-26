import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ApiConfigService } from '../../common/api-config/api-config.service';
import { CommonModule } from '../../common/common.module';
import { CustomerModule } from '../customer/customer.module';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';
import { CustomerAuthStrategy } from './strategies/customer.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    CommonModule,
    JwtModule.registerAsync({
      imports: [CommonModule],
      useFactory: async (apiConfig: ApiConfigService) => ({
        secret: apiConfig.jwtSecret,
        signOptions: {
          expiresIn: apiConfig.jwtExpires,
        },
      }),
      inject: [ApiConfigService],
    }),
    PassportModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, CustomerAuthStrategy, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
