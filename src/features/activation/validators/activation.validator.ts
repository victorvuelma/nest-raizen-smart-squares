import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { ActivateOfferDto } from '../dtos/activate-offer.dto';

@Injectable()
export class ActivationValidator {
  private _activateOfferScheme = z.object({
    customerId: z.string().uuid(),
    offerId: z.string().uuid(),
  });

  validateActivateOffer(activate: Partial<ActivateOfferDto>): ActivateOfferDto {
    const activateOffer = this._activateOfferScheme.parse(activate);

    return activateOffer;
  }
}
