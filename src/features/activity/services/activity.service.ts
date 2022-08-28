import { BadRequestException, Injectable } from '@nestjs/common';

import { SessionService } from '../../session/services/session.service';
import { SaveActivityDto } from '../dtos/save-activity.dto';
import { ActivityMapper } from '../mappers/activity.mapper';
import { ActivityModel } from '../models/activity.model';
import { ActivityRepository } from '../repository/activity.repository';
import { ActivityValidator } from '../validators/activity.validator';

@Injectable()
export class ActivityService {
  constructor(
    private _sessionService: SessionService,
    private _activityMapper: ActivityMapper,
    private _activityRepository: ActivityRepository,
    private _activityValidator: ActivityValidator,
  ) {}

  async save(data: SaveActivityDto): Promise<ActivityModel | null> {
    const save = this._activityValidator.validateSave(data);

    const session = await this._sessionService.findBicycleActiveSession(
      save.bicycleId,
    );
    if (!session) {
      throw new BadRequestException('No session found for bicycle');
    }

    if (save.cycles <= 0 && save.potency <= 0) {
      return null;
    }

    const activity = await this._activityRepository.create({
      session: { connect: { id: session.id } },
      points: 0,
      cycles: save.cycles,
      potency: save.potency,
      when: save.when,
    });

    const activityModel = this._activityMapper.mapper.map(
      activity,
      ActivityModel,
    );

    return activityModel;
  }
}
