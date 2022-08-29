import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUES } from '../../../common/infra/queue/queues';
import { SessionService } from '../../session/services/session.service';
import { ACTIVITY_JOBS } from '../activity.jobs';
import { BikeActivityInputDto } from '../dtos/bike-activity-input.dto';
import { ActivityService } from '../services/activity.service';

@Processor(QUEUES.ACTIVITY_QUEUE)
export class ActivityQueueProcessor {
  constructor(
    private _activityService: ActivityService,
    private _sessionService: SessionService,
  ) {}

  @Process(ACTIVITY_JOBS.PROCESS_BIKE_INPUT)
  async processFile(job: Job<BikeActivityInputDto>) {
    const { when, ...data } = job.data;

    const activity = await this._activityService.save({
      when: new Date(when),
      ...data,
    });

    if (!!activity?.sessionId) {
      await this._sessionService.updateSession(activity.sessionId);
    }

    await job.progress(100);
    await job.moveToCompleted(
      !!activity ? `activity:${activity.id}` : 'activity:skipped',
    );
  }
}
