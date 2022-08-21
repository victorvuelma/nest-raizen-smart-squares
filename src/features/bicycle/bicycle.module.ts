import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { BicycleController } from './bicycle.controller';
import { BicycleMapper } from './mappers/bicycle.mapper';
import { BicycleRepository } from './repository/bicycle.repository';
import { BicycleService } from './services/bicycle.service';

@Module({
  imports: [CommonModule],
  controllers: [BicycleController],
  providers: [BicycleMapper, BicycleRepository, BicycleService],
  exports: [BicycleService],
})
export class BicycleModule {}
