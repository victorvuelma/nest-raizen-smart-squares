import { Injectable } from '@nestjs/common';
import { Place, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class PlaceRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    PlaceWhereUniqueInput: Prisma.PlaceWhereUniqueInput,
  ): PrismaPromise<Place | null> {
    return this._prisma.place.findUnique({
      where: PlaceWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaceWhereUniqueInput;
    where?: Prisma.PlaceWhereInput;
    orderBy?: Prisma.PlaceOrderByWithRelationInput;
  }): PrismaPromise<Place[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.place.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.PlaceCreateInput): PrismaPromise<Place> {
    return this._prisma.place.create({
      data,
    });
  }

  update(params: {
    where: Prisma.PlaceWhereUniqueInput;
    data: Prisma.PlaceUpdateInput;
  }): PrismaPromise<Place> {
    const { where, data } = params;
    return this._prisma.place.update({
      data,
      where,
    });
  }

  delete(where: Prisma.PlaceWhereUniqueInput): PrismaPromise<Place> {
    return this._prisma.place.delete({
      where,
    });
  }
}
