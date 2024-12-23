import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { CommonModule } from './common/common.module';
import { SocketIoModule } from './common/infra/websocket/socketio.module';
import { ActivationModule } from './features/activation/activation.module';
import { ActivityModule } from './features/activity/activity.module';
import { AuthModule } from './features/auth/auth.module';
import { BicycleModule } from './features/bicycle/bicycle.module';
import { CustomerModule } from './features/customer/customer.module';
import { OfferModule } from './features/offer/offer.module';
import { PartnerModule } from './features/partner/partner.module';
import { PlaceModule } from './features/place/place.module';
import { SessionModule } from './features/session/session.module';

@Module({
  imports: [
    CommonModule,
    ScheduleModule.forRoot(),
    SocketIoModule,
    ActivationModule,
    ActivityModule,
    AuthModule,
    BicycleModule,
    CustomerModule,
    OfferModule,
    PartnerModule,
    PlaceModule,
    SessionModule,
  ],
  exports: [CommonModule, CustomerModule, OfferModule],
})
export class AppModule {}
