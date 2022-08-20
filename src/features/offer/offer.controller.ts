import { Controller, Get } from '@nestjs/common';

import { OfferService } from './services/offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly _offerService: OfferService) {}

  @Get('')
  async find() {
    const offers = await this._offerService.find();

    return offers;
  }
}
