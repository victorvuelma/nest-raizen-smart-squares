import { Module } from '@nestjs/common';
import { BcryptService } from './infra/crypt/bcrypt.service';
import { PrismaService } from './infra/database/prisma.service';
import { MapperService } from './infra/mapper/mapper.service';

@Module({
  providers: [BcryptService, MapperService, PrismaService],
  exports: [BcryptService, MapperService, PrismaService],
})
export class CommonModule {}
