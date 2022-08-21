import { Injectable } from '@nestjs/common';
import { Offer, Partner, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

type OfferWithPartner = Offer & {
  partner: Partner;
};

@Injectable()
export class OfferRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    OfferWhereUniqueInput: Prisma.OfferWhereUniqueInput,
  ): PrismaPromise<OfferWithPartner | null> {
    return this._prisma.offer.findUnique({
      where: OfferWhereUniqueInput,
      include: {
        partner: true,
      },
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OfferWhereUniqueInput;
    where?: Prisma.OfferWhereInput;
    orderBy?: Prisma.OfferOrderByWithRelationInput;
  }): PrismaPromise<OfferWithPartner[]> {
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

  create(data: Prisma.OfferCreateInput): PrismaPromise<Offer> {
    return this._prisma.offer.create({
      data,
    });
  }

  update(params: {
    where: Prisma.OfferWhereUniqueInput;
    data: Prisma.OfferUpdateInput;
  }): PrismaPromise<Offer> {
    const { where, data } = params;
    return this._prisma.offer.update({
      data,
      where,
    });
  }

  delete(where: Prisma.OfferWhereUniqueInput): PrismaPromise<Offer> {
    return this._prisma.offer.delete({
      where,
    });
  }
}
