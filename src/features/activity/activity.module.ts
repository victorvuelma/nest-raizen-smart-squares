import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { ActivityController } from './activity.controller';
import { ActivityMapper } from './mappers/activity.mapper';
import { ActivityRepository } from './repository/activity.repository';
import { ActivityService } from './services/activity.service';
import { ActivityValidator } from './validators/activity.validator';

@Module({
  imports: [CommonModule],
  controllers: [ActivityController],
  providers: [
    ActivityMapper,
    ActivityRepository,
    ActivityService,
    ActivityValidator,
  ],
})
export class ActivityModule {}
