import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { BullQueueModule } from '../../common/infra/queue/bull-queue.module';
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
      name: 'session-queue',
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
})
export class SessionModule {}