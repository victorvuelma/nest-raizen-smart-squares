import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';

import { CommonModule } from '../../common.module';
import { ApiConfigService } from '../api-config/api-config.service';
import { BullBoardService } from './bull-board.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [CommonModule],
      inject: [ApiConfigService],
      useFactory: async (apiConfig: ApiConfigService) => ({
        url: apiConfig.redisTlsUrl ?? apiConfig.redisUrl,
        redis: {
          db: apiConfig.redisDb,
          tls: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
  providers: [BullBoardService],
  exports: [BullModule, BullBoardService],
})
export class BullQueueModule {
  static registerQueue(...options: BullModuleOptions[]): DynamicModule {
    return BullModule.registerQueue(...options);
  }
}
