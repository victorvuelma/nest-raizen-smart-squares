import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { StartSessionDto } from '../dtos/start-session.dto';

@Injectable()
export class SessionValidator {
  private _startSessionScheme = z.object({
    customerId: z.string().uuid(),
    bicycleCode: z.string(),
  });

  validateStartSession(start: Partial<StartSessionDto>): StartSessionDto {
    const startSession = this._startSessionScheme.parse(start);

    return startSession;
  }
}
