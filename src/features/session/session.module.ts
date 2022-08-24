import { InjectQueue } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { Queue } from 'bull';

import { CommonModule } from '../../common/common.module';
import { BullBoardService } from '../../common/infra/queue/bull-board.service';
import { BullQueueModule } from '../../common/infra/queue/bull-queue.module';
import { QUEUES } from '../../common/infra/queue/queues';
import { BicycleModule } from '../bicycle/bicycle.module';
import { CustomerModule } from '../customer/customer.module';
import { SessionMapper } from './mappers/session.mapper';
import { SessionQueueProcessor } from './processors/session.processor';
import { SessionRepository } from './repository/session.repository';
import { SessionService } from './services/session.service';
import { SessionController } from './session.controller';
import { SessionValidator } from './validators/session.validator';

@Module({
  imports: [
    BullQueueModule,
    BullQueueModule.registerQueue({
      name: QUEUES.SESSION_QUEUE,
    }),
    CommonModule,
    BicycleModule,
    CustomerModule,
  ],
  controllers: [SessionController],
  providers: [
    SessionMapper,
    SessionQueueProcessor,
    SessionRepository,
    SessionService,
    SessionValidator,
  ],
  exports: [SessionService],
})
export class SessionModule {
  constructor(
    _queueBoardService: BullBoardService,
    @InjectQueue(QUEUES.SESSION_QUEUE) _sessionQueue: Queue,
  ) {
    _queueBoardService.addQueue(_sessionQueue);
  }
}
