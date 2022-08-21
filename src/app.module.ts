import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { MqttBrokerModule } from './common/infra/broker/mqtt-broker.module';
import { BullQueueModule } from './common/infra/queue/bull-queue.module';
import { ActivationModule } from './features/activation/activation.module';
import { AuthModule } from './features/auth/auth.module';
import { BicycleModule } from './features/bicycle/bicycle.module';
import { CustomerModule } from './features/customer/customer.module';
import { OfferModule } from './features/offer/offer.module';
import { PartnerModule } from './features/partner/partner.module';
import { SessionModule } from './features/session/session.module';

@Module({
  imports: [
    CommonModule,
    ActivationModule,
    AuthModule,
    BicycleModule,
    CustomerModule,
    OfferModule,
    PartnerModule,
    SessionModule,
  ],
  exports: [CommonModule, CustomerModule, OfferModule],
})
export class AppModule {}
