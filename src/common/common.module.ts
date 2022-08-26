import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiConfigService } from './api-config/api-config.service';
import { apiConfigValidate } from './api-config/api-config.validation';
import { BcryptService } from './infra/crypt/bcrypt.service';
import { PrismaService } from './infra/database/prisma.service';
import { MapperService } from './infra/mapper/mapper.service';

@Module({
  imports: [ConfigModule.forRoot({ cache: true, validate: apiConfigValidate })],
  providers: [ApiConfigService, BcryptService, MapperService, PrismaService],
  exports: [ApiConfigService, BcryptService, MapperService, PrismaService],
})
export class CommonModule {}
