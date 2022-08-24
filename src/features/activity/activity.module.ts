import { InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Queue } from 'bull';

import { CommonModule } from '../../common/common.module';
import { BullBoardService } from '../../common/infra/queue/bull-board.service';
import { BullQueueModule } from '../../common/infra/queue/bull-queue.module';
import { QUEUES } from '../../common/infra/queue/queues';
import { SessionModule } from '../session/session.module';
import { ActivityController } from './activity.controller';
import { ActivityMapper } from './mappers/activity.mapper';
import { ActivityQueueProcessor } from './processors/activity.processor';
import { ActivityRepository } from './repository/activity.repository';
import { ActivityService } from './services/activity.service';
import { ActivityValidator } from './validators/activity.validator';

@Module({
  imports: [
    CommonModule,
    BullQueueModule,
    BullQueueModule.registerQueue({ name: QUEUES.ACTIVITY_QUEUE }),
    SessionModule,
  ],
  controllers: [ActivityController],
  providers: [
    ActivityQueueProcessor,
    ActivityMapper,
    ActivityRepository,
    ActivityService,
    ActivityValidator,
  ],
})
export class ActivityModule {
  constructor(
    _queueBoardService: BullBoardService,
    @InjectQueue(QUEUES.ACTIVITY_QUEUE) _activityQueue: Queue,
  ) {
    _queueBoardService.addQueue(_activityQueue);
  }
}
