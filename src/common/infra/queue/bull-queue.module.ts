import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { CommonModule } from '../../common.module';
import { ApiConfigService } from '../api-config/api-config.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [CommonModule],
      inject: [ApiConfigService],
      useFactory: async (apiConfig: ApiConfigService) => ({
        prefix: 'ss_',
        redis: {
          host: apiConfig.redisHost,
          port: apiConfig.redisPort,
          password: apiConfig.redisPassword,
        },
      }),
    }),
  ],
  exports: [BullModule],
})
export class BullQueueModule {}
