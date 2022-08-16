import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { CustomerController } from './customer.controller';
import { CustomerMapper } from './mappers/customer.mapper';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerService } from './services/customer.service';
import { CustomerValidator } from './validators/customer.validator';

@Module({
  imports: [CommonModule],
  controllers: [CustomerController],
  providers: [
    CustomerMapper,
    CustomerRepository,
    CustomerService,
    CustomerValidator,
  ],
})
export class CustomerModule {}
