import { BullModule, BullModuleOptions } from '@nestjs/bull';
import { DynamicModule, Module } from '@nestjs/common';

import { ApiConfigService } from '../../api-config/api-config.service';
import { CommonModule } from '../../common.module';
import { BullBoardService } from './bull-board.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [CommonModule],
      inject: [ApiConfigService],
      useFactory: async (apiConfig: ApiConfigService) => ({
        redis: {
          db: apiConfig.redisDb,
          host: apiConfig.redisHost,
          password: apiConfig.redisPassword,
          port: apiConfig.redisPort,
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
