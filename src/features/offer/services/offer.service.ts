import { Injectable } from '@nestjs/common';

import { OfferMapper } from '../mappers/offer.mapper';
import { OfferModel } from '../models/offer.model';
import { OfferRepository } from '../repository/offer.repository';

@Injectable()
export class OfferService {
  constructor(
    private _offerMapper: OfferMapper,
    private _offerRepository: OfferRepository,
  ) {}

  async find(): Promise<Array<OfferModel>> {
    const offers = await this._offerRepository.find({
      where: { active: true },
    });

    const offerModels = this._offerMapper.mapper.mapArray<OfferModel>(
      offers,
      OfferModel,
    );

    return offerModels;
  }
}
