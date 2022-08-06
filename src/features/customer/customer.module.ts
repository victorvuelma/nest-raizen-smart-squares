import { Module } from '@nestjs/common';

import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './services/customer.service';
import { CustomerValidator } from './validators/customer.validator';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
