import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { SaveActivityDto } from '../dtos/save-activity.dto';

@Injectable()
export class ActivityValidator {
  private _saveScheme = z.object({
    bicycleId: z.string().uuid(),
    when: z.date(),
    running: z.boolean(),
    potency: z.number().min(0),
    cycles: z.number().min(0),
  });

  validateSave(data: Partial<SaveActivityDto>): SaveActivityDto {
    return this._saveScheme.parse(data);
  }
}
