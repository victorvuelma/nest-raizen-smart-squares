import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { BicycleModule } from '../bicycle/bicycle.module';
import { CustomerModule } from '../customer/customer.module';
import { SessionMapper } from './mappers/session.mapper';
import { SessionRepository } from './repository/session.repository';
import { SessionService } from './services/session.service';
import { SessionController } from './session.controller';
import { SessionValidator } from './validators/session.validator';

@Module({
  imports: [CommonModule, BicycleModule, CustomerModule],
  controllers: [SessionController],
  providers: [
    SessionMapper,
    SessionRepository,
    SessionService,
    SessionValidator,
  ],
})
export class SessionModule {}
