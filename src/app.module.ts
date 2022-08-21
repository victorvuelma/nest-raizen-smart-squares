import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { MqttBrokerModule } from './common/infra/broker/mqtt-broker.module';
import { BullQueueModule } from './common/infra/queue/bull-queue.module';
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
    BullQueueModule,
    MqttBrokerModule,
  ],
  exports: [CommonModule, CustomerModule, OfferModule],
})
export class AppModule {}
