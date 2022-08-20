import { Controller, Get } from '@nestjs/common';

import { PartnerService } from './services/partner.service';

@Controller('partner')
export class PartnerController {
  constructor(private readonly _partnerService: PartnerService) {}

  @Get('')
  async find() {
    const partners = await this._partnerService.find();

    return partners;
  }
}
