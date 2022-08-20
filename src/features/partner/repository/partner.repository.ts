import { Injectable } from '@nestjs/common';
import { Partner, Prisma } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

@Injectable()
export class PartnerRepository {
  constructor(private _prisma: PrismaService) {}

  async get(
    PartnerWhereUniqueInput: Prisma.PartnerWhereUniqueInput,
  ): Promise<Partner | null> {
    return this._prisma.partner.findUnique({
      where: PartnerWhereUniqueInput,
    });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PartnerWhereUniqueInput;
    where?: Prisma.PartnerWhereInput;
    orderBy?: Prisma.PartnerOrderByWithRelationInput;
  }): Promise<Partner[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.partner.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async create(data: Prisma.PartnerCreateInput): Promise<Partner> {
    return this._prisma.partner.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PartnerWhereUniqueInput;
    data: Prisma.PartnerUpdateInput;
  }): Promise<Partner> {
    const { where, data } = params;
    return this._prisma.partner.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PartnerWhereUniqueInput): Promise<Partner> {
    return this._prisma.partner.delete({
      where,
    });
  }
}
