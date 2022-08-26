import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { ServerOptions } from 'socket.io';

import { ApiConfigService } from '../../api-config/api-config.service';

export class RedisSocketIoAdapter extends IoAdapter {
  private adapterConstructor?: ReturnType<typeof createAdapter>;

  constructor(
    app: INestApplicationContext,
    private _apiConfig: ApiConfigService,
  ) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const pubClient = new Redis({
      db: this._apiConfig.redisDb,
      host: this._apiConfig.redisHost,
      password: this._apiConfig.redisPassword,
      port: this._apiConfig.redisPort,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const subClient = pubClient.duplicate();

    this.adapterConstructor = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.adapterConstructor);

    return server;
  }
}
