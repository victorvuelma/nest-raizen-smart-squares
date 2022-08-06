import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomerModel } from './models/create-customer.model';
import { CustomerModel } from './models/customer.model';
import { CustomerService } from './services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() customer: Partial<CreateCustomerModel>,
  ): Promise<CustomerModel> {
    return this.customerService.create(customer);
  }
}
