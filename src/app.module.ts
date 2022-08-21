import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ActivationModule } from './features/activation/activation.module';
import { AuthModule } from './features/auth/auth.module';
import { CustomerModule } from './features/customer/customer.module';
import { OfferModule } from './features/offer/offer.module';
import { PartnerModule } from './features/partner/partner.module';

@Module({
  imports: [
    CommonModule,
    ActivationModule,
    AuthModule,
    CustomerModule,
    OfferModule,
    PartnerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CommonModule, CustomerModule, OfferModule],
})
export class AppModule {}
