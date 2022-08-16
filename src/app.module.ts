import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './features/customer/customer.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CustomerModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [CommonModule],
})
export class AppModule {}
