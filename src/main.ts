import 'core-js/es/reflect';

import fastifyHelmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ApiConfigService } from './common/api-config/api-config.service';
import { PrismaService } from './common/infra/database/prisma.service';
import { HttpExceptionFilter } from './common/infra/network/filters/http-exception.filter';
import { ZodExceptionFilter } from './common/infra/network/filters/zod-exception.filter';
import { RedisSocketIoAdapter } from './common/infra/websocket/redis.ioadapter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const apiConfig = app.get(ApiConfigService);

  // Fastify Filters
  app
    .setGlobalPrefix('v1')
    .useGlobalFilters(new HttpExceptionFilter(), new ZodExceptionFilter());

  // Fastify Helmet
  await app.getHttpAdapter().getInstance().register(fastifyHelmet);

  // Prisma Service
  const prisma = app.get(PrismaService);

  const redisIoAdapter = new RedisSocketIoAdapter(app, apiConfig);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  const mqttMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      hostname: apiConfig.mqttHostname,
      port: apiConfig.mqttPort,
      username: apiConfig.mqttUser,
      password: apiConfig.mqttPassword,
      protocol: apiConfig.mqttProtocol,
      protocolVersion: apiConfig.mqttProtocolVersion,
    },
  });

  // Enable Shutdown Hooks
  app.enableShutdownHooks();
  await prisma.enableShutdownHooks(app);
  mqttMicroservice.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(apiConfig.port, apiConfig.host);
}
bootstrap();
