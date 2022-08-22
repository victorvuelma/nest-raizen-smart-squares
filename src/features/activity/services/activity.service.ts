import { Injectable } from '@nestjs/common';

import { ActivityMapper } from '../mappers/activity.mapper';
import { ActivityRepository } from '../repository/activity.repository';
import { ActivityValidator } from '../validators/activity.validator';

@Injectable()
export class ActivityService {
  constructor(
    private _activityMapper: ActivityMapper,
    private _activityRepository: ActivityRepository,
    private _activityValidator: ActivityValidator,
  ) {}
}
