import { Injectable } from '@nestjs/common';
import {
  Activity,
  Bicycle,
  Prisma,
  PrismaPromise,
  Session,
} from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

type SessionDetail = Session & {
  activities: Activity[];
  bicycle: Bicycle;
};

@Injectable()
export class SessionRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    sessionWhereUniqueInput: Prisma.SessionWhereUniqueInput,
  ): PrismaPromise<SessionDetail | null> {
    return this._prisma.session.findUnique({
      where: sessionWhereUniqueInput,
      include: { activities: true, bicycle: true },
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.SessionWhereUniqueInput;
    where?: Prisma.SessionWhereInput;
    orderBy?: Prisma.SessionOrderByWithRelationInput;
  }): PrismaPromise<Session[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.session.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.SessionCreateInput): PrismaPromise<Session> {
    return this._prisma.session.create({
      data,
    });
  }

  update(params: {
    where: Prisma.SessionWhereUniqueInput;
    data: Prisma.SessionUpdateInput;
  }): PrismaPromise<Session> {
    const { where, data } = params;
    return this._prisma.session.update({
      data,
      where,
    });
  }

  delete(where: Prisma.SessionWhereUniqueInput): PrismaPromise<Session> {
    return this._prisma.session.delete({
      where,
    });
  }
}
