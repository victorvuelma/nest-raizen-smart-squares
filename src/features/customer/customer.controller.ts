import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { CustomerModel } from './models/customer.model';
import { CustomerService } from './services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @Body() customer: Partial<CreateCustomerDto>,
  ): Promise<CustomerModel> {
    return this.customerService.create(customer);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req) {
    return req.user;
  }
}
