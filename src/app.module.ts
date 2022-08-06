import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BCryptService } from './common/infra/crypt/bcrypt.service';
import { PrismaService } from './common/infra/database/prisma.service';
import { CustomerModule } from './features/customer/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
