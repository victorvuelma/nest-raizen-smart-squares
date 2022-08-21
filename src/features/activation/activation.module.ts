import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { CustomerModule } from '../customer/customer.module';
import { OfferModule } from '../offer/offer.module';
import { ActivationController } from './activation.controller';
import { ActivationMapper } from './mappers/activation.mapper';
import { ActivationRepository } from './repository/activation.repository';
import { ActivationService } from './services/activation.service';
import { ActivationValidator } from './validators/activation.validator';

@Module({
  imports: [CommonModule, CustomerModule, OfferModule],
  controllers: [ActivationController],
  providers: [
    ActivationMapper,
    ActivationRepository,
    ActivationService,
    ActivationValidator,
  ],
})
export class ActivationModule {}
