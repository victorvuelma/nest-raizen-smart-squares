import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { QUEUES } from '../../../common/infra/queue/queues';
import { SessionService } from '../services/session.service';

@Processor(QUEUES.SESSION_QUEUE)
export class SessionQueueProcessor {
  constructor(private _sessionService: SessionService) {}

  @Process('close-session')
  async processFile(job: Job) {
    this._sessionService.closeSession({
      sessionId: job.data.sessionId,
      points: 80,
    });
  }
}
