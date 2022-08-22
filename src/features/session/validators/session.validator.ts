import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { EndCustomerSessionDto } from '../dtos/end-customer-session.dto';
import { StartSessionDto } from '../dtos/start-session.dto';

@Injectable()
export class SessionValidator {
  private _startScheme = z.object({
    customerId: z.string().uuid(),
    bicycleCode: z.string(),
  });

  validateStart(data: Partial<StartSessionDto>): StartSessionDto {
    return this._startScheme.parse(data);
  }

  private _endScheme = z.object({
    customerId: z.string().uuid(),
  });

  validateEnd(data: Partial<EndCustomerSessionDto>): EndCustomerSessionDto {
    return this._endScheme.parse(data);
  }
}
