import { Injectable } from '@nestjs/common';
import { Activation, Offer, Prisma, PrismaPromise } from '@prisma/client';

import { PrismaService } from '../../../common/infra/database/prisma.service';

type ActivationWithOffer = Activation & {
  offer: Offer;
};

@Injectable()
export class ActivationRepository {
  constructor(private _prisma: PrismaService) {}

  get(
    activationWhereUniqueInput: Prisma.ActivationWhereUniqueInput,
  ): PrismaPromise<Activation | null> {
    return this._prisma.activation.findUnique({
      where: activationWhereUniqueInput,
    });
  }

  find(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ActivationWhereUniqueInput;
    where?: Prisma.ActivationWhereInput;
    orderBy?: Prisma.ActivationOrderByWithRelationInput;
  }): PrismaPromise<Activation[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this._prisma.activation.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  create(
    data: Prisma.ActivationCreateInput,
  ): PrismaPromise<ActivationWithOffer> {
    return this._prisma.activation.create({
      data,
      include: {
        offer: true,
      },
    });
  }

  update(params: {
    where: Prisma.ActivationWhereUniqueInput;
    data: Prisma.ActivationUpdateInput;
  }): PrismaPromise<Activation> {
    const { where, data } = params;
    return this._prisma.activation.update({
      data,
      where,
    });
  }

  delete(where: Prisma.ActivationWhereUniqueInput): PrismaPromise<Activation> {
    return this._prisma.activation.delete({
      where,
    });
  }
}
