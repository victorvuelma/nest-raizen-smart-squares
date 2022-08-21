import { BadRequestException, Injectable } from '@nestjs/common';

import { OfferMapper } from '../mappers/offer.mapper';
import { OfferDetailsModel } from '../models/offer-details';
import { OfferRepository } from '../repository/offer.repository';

@Injectable()
export class OfferService {
  constructor(
    private _offerMapper: OfferMapper,
    private _offerRepository: OfferRepository,
  ) {}

  async get(offerId: string): Promise<OfferDetailsModel> {
    const offer = await this._offerRepository.get({
      id: offerId,
    });
    if (!offer) {
      throw new BadRequestException('Offer not found');
    }

    const offerModel = this._offerMapper.mapper.map(offer, OfferDetailsModel);

    return offerModel;
  }

  async find(): Promise<Array<OfferDetailsModel>> {
    const offers = await this._offerRepository.find({
      where: { active: true },
    });

    const offerModels = this._offerMapper.mapper.mapArray<OfferDetailsModel>(
      offers,
      OfferDetailsModel,
    );

    return offerModels;
  }
}
