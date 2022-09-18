import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { PlaceMapper } from './mappers/place.mapper';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './repository/place.repository';
import { PlaceService } from './services/place.service';

@Module({
  imports: [CommonModule],
  controllers: [PlaceController],
  providers: [PlaceMapper, PlaceRepository, PlaceService],
  exports: [PlaceService],
})
export class PlaceModule {}
