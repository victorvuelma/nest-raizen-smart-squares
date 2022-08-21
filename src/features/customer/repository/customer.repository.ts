import { Injectable } from '@nestjs/common';
import { Customer, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class CustomerRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    customerWhereUniqueInput: Prisma.CustomerWhereUniqueInput,
  ): PrismaPromise<Customer | null> {
    return this._prisma.customer.findUnique({
      where: customerWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CustomerWhereUniqueInput;
    where?: Prisma.CustomerWhereInput;
    orderBy?: Prisma.CustomerOrderByWithRelationInput;
  }): PrismaPromise<Customer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.customer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.CustomerCreateInput): PrismaPromise<Customer> {
    return this._prisma.customer.create({
      data,
    });
  }

  update(params: {
    where: Prisma.CustomerWhereUniqueInput;
    data: Prisma.CustomerUpdateInput;
  }): PrismaPromise<Customer> {
    const { where, data } = params;
    return this._prisma.customer.update({
      data,
      where,
    });
  }

  delete(where: Prisma.CustomerWhereUniqueInput): PrismaPromise<Customer> {
    return this._prisma.customer.delete({
      where,
    });
  }
}
