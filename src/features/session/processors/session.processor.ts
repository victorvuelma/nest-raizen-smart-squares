import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { SessionService } from '../services/session.service';

@Processor('session-queue')
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
