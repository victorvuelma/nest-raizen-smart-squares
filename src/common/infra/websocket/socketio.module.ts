import { Module } from '@nestjs/common';

import { AuthModule } from '../../../features/auth/auth.module';
import { RedisCacheModule } from '../cache/redis.module';
import { SocketIoGateway } from './socketio.gateway';

@Module({
  imports: [RedisCacheModule, AuthModule],
  providers: [SocketIoGateway],
  exports: [SocketIoGateway],
})
export class SocketIoModule {}
