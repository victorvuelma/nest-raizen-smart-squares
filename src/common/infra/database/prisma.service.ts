import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { ApiConfigService } from '../api-config/api-config.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private apiConfig: ApiConfigService) {
    super({
      log:
        apiConfig.environment == 'DEVELOPMENT'
          ? [
              { emit: 'stdout', level: 'query' },
              { emit: 'stdout', level: 'info' },
              { emit: 'stdout', level: 'warn' },
              { emit: 'stdout', level: 'error' },
            ]
          : undefined,
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
