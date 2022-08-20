import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { OfferMapper } from './mappers/offer.mapper';
import { OfferController } from './offer.controller';
import { OfferRepository } from './repository/offer.repository';
import { OfferService } from './services/offer.service';

@Module({
  imports: [CommonModule],
  controllers: [OfferController],
  providers: [OfferMapper, OfferRepository, OfferService],
  exports: [OfferService],
})
export class OfferModule {}
