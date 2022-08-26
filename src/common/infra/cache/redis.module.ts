import { CacheModule, Module } from '@nestjs/common';
import * as ioRedisStore from 'cache-manager-ioredis';
import { RedisOptions } from 'ioredis';

import { ApiConfigService } from '../../api-config/api-config.service';
import { CommonModule } from '../../common.module';

@Module({
  imports: [
    CacheModule.registerAsync<RedisOptions>({
      imports: [CommonModule],
      inject: [ApiConfigService],
      useFactory: async (apiConfig: ApiConfigService) => ({
        isGlobal: true,
        store: ioRedisStore,
        db: apiConfig.redisDb,
        host: apiConfig.redisHost,
        password: apiConfig.redisPassword,
        port: apiConfig.redisPort,
        keyPrefix: 'cache:',
        tls: {
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
