import { Injectable } from '@nestjs/common';
import { Customer, Prisma } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class CustomerRepository {
  constructor(private _prisma: PrismaService) {}

  async get(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): Promise<Customer | null> {
    return this._prisma.customer.findUnique({
      where: customerWhereUniqueInput,
    });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): Promise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    return this._prisma.customer.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): Promise<Customer> {
    const { where, data } = params;
    return this._prisma.customer.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.CustomerWhereUniqueInput): Promise<Customer> {
    return this._prisma.customer.delete({
      where,
    });
  }
}
