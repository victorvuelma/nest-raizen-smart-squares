import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

import { QUEUES } from '../../../common/infra/queue/queues';
import { ACTIVITY_JOBS } from '../activity.jobs';
import { BikeActivityInputDto } from '../dtos/bike-activity-input.dto';
import { ActivityService } from '../services/activity.service';

@Processor(QUEUES.ACTIVITY_QUEUE)
export class ActivityQueueProcessor {
  protected readonly logger = new Logger('ActivityQueueProcessor');

  constructor(private _activityService: ActivityService) {}

  @Process(ACTIVITY_JOBS.PROCESS_BIKE_INPUT)
  async processFile(job: Job<BikeActivityInputDto>) {
    const { when, ...data } = job.data;

    const activity = await this._activityService.save({
      when: new Date(when),
      ...data,
    });

    await job.progress(100);
    await job.moveToCompleted(activity.id);
  }
}
