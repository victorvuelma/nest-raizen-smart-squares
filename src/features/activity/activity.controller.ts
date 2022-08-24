import { InjectQueue } from '@nestjs/bull';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Queue } from 'bull';

import { ACTIVITY_JOBS } from './activity.jobs';
import { BikeActivityInputDto } from './dtos/bike-activity-input.dto';

@Controller()
export class ActivityController {
  constructor(@InjectQueue('activity-queue') private _activityQueue: Queue) {}

  @MessagePattern('bicycles/+/activity')
  getNotifications(@Payload() data: BikeActivityInputDto) {
    this._activityQueue.add(ACTIVITY_JOBS.PROCESS_BIKE_INPUT, data);

    return true;
  }
}
