import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { AuthModule } from './features/auth/auth.module';
import { CustomerModule } from './features/customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true }),
    CommonModule,
    AuthModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CommonModule, CustomerModule],
})
export class AppModule {}
