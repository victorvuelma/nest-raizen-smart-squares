import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { ActivateOfferDto } from '../dtos/activate-offer.dto';

@Injectable()
export class ActivationValidator {
  private _activateScheme = z.object({
    customerId: z.string().uuid(),
    offerId: z.string().uuid(),
  });

  validateActivate(data: Partial<ActivateOfferDto>): ActivateOfferDto {
    return this._activateScheme.parse(data);
  }
}
