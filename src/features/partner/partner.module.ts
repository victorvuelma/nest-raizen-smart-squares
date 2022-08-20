import { Module } from '@nestjs/common';

import { CommonModule } from '../../common/common.module';
import { PartnerMapper } from './mappers/partner.mapper';
import { PartnerController } from './partner.controller';
import { PartnerRepository } from './repository/partner.repository';
import { PartnerService } from './services/partner.service';

@Module({
  imports: [CommonModule],
  controllers: [PartnerController],
  providers: [PartnerMapper, PartnerRepository, PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
