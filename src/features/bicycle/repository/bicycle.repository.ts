import { Injectable } from '@nestjs/common';
import { Bicycle, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class BicycleRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    BicycleWhereUniqueInput: Prisma.BicycleWhereUniqueInput,
  ): PrismaPromise<Bicycle | null> {
    return this._prisma.bicycle.findUnique({
      where: BicycleWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BicycleWhereUniqueInput;
    where?: Prisma.BicycleWhereInput;
    orderBy?: Prisma.BicycleOrderByWithRelationInput;
  }): PrismaPromise<Bicycle[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this._prisma.bicycle.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.BicycleCreateInput): PrismaPromise<Bicycle> {
    return this._prisma.bicycle.create({
      data,
    });
  }

  update(params: {
    where: Prisma.BicycleWhereUniqueInput;
    data: Prisma.BicycleUpdateInput;
  }): PrismaPromise<Bicycle> {
    const { where, data } = params;
    return this._prisma.bicycle.update({
      data,
      where,
    });
  }

  delete(where: Prisma.BicycleWhereUniqueInput): PrismaPromise<Bicycle> {
    return this._prisma.bicycle.delete({
      where,
    });
  }
}
