import { Injectable } from '@nestjs/common';
import { Offer, Partner, Prisma } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

type OfferWithPartner = Offer & {
  partner: Partner;
};

@Injectable()
export class OfferRepository {
  constructor(private _prisma: PrismaService) {}

  async get(
    OfferWhereUniqueInput: Prisma.OfferWhereUniqueInput,
  ): Promise<Offer | null> {
    return this._prisma.offer.findUnique({
      where: OfferWhereUniqueInput,
    });
  }

  async find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OfferWhereUniqueInput;
    where?: Prisma.OfferWhereInput;
    orderBy?: Prisma.OfferOrderByWithRelationInput;
  }): Promise<OfferWithPartner[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.offer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        partner: true,
      },
    });
  }

  async create(data: Prisma.OfferCreateInput): Promise<Offer> {
    return this._prisma.offer.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.OfferWhereUniqueInput;
    data: Prisma.OfferUpdateInput;
  }): Promise<Offer> {
    const { where, data } = params;
    return this._prisma.offer.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.OfferWhereUniqueInput): Promise<Offer> {
    return this._prisma.offer.delete({
      where,
    });
  }
}
