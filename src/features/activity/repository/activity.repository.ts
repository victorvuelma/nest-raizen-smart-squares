import { Injectable } from '@nestjs/common';
import { Activity, Offer, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class ActivityRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    activityWhereUniqueInput: Prisma.ActivityWhereUniqueInput,
  ): PrismaPromise<Activity | null> {
    return this._prisma.activity.findUnique({
      where: activityWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivityWhereUniqueInput;
    where?: Prisma.ActivityWhereInput;
    orderBy?: Prisma.ActivityOrderByWithRelationInput;
  }): PrismaPromise<Activity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.activity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.ActivityCreateInput): PrismaPromise<Activity> {
    return this._prisma.activity.create({
      data,
    });
  }

  update(params: {
    where: Prisma.ActivityWhereUniqueInput;
    data: Prisma.ActivityUpdateInput;
  }): PrismaPromise<Activity> {
    const { where, data } = params;
    return this._prisma.activity.update({
      data,
      where,
    });
  }

  delete(where: Prisma.ActivityWhereUniqueInput): PrismaPromise<Activity> {
    return this._prisma.activity.delete({
      where,
    });
  }
}
