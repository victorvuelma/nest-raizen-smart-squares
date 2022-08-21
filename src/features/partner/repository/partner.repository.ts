import { Injectable } from '@nestjs/common';
import { Partner, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class PartnerRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    PartnerWhereUniqueInput: Prisma.PartnerWhereUniqueInput,
  ): PrismaPromise<Partner | null> {
    return this._prisma.partner.findUnique({
      where: PartnerWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PartnerWhereUniqueInput;
    where?: Prisma.PartnerWhereInput;
    orderBy?: Prisma.PartnerOrderByWithRelationInput;
  }): PrismaPromise<Partner[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.partner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(data: Prisma.PartnerCreateInput): PrismaPromise<Partner> {
    return this._prisma.partner.create({
      data,
    });
  }

  update(params: {
    where: Prisma.PartnerWhereUniqueInput;
    data: Prisma.PartnerUpdateInput;
  }): PrismaPromise<Partner> {
    const { where, data } = params;
    return this._prisma.partner.update({
      data,
      where,
    });
  }

  delete(where: Prisma.PartnerWhereUniqueInput): PrismaPromise<Partner> {
    return this._prisma.partner.delete({
      where,
    });
  }
}
