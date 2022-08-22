import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { CloseSessionDto } from '../dtos/close-session.dto';
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

  private _closeScheme = z.object({
    sessionId: z.string().uuid(),
    points: z.number().int().min(0),
  });

  validateClose(data: Partial<CloseSessionDto>): CloseSessionDto {
    return this._closeScheme.parse(data);
  }
}
