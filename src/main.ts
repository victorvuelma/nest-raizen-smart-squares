import 'core-js/es/reflect';

import fastifyHelmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ApiConfigService } from './common/infra/api-config/api-config.service';
import { PrismaService } from './common/infra/database/prisma.service';
import { HttpExceptionFilter } from './common/infra/http/filters/http-exception.filter';
import { ZodExceptionFilter } from './common/infra/http/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const apiConfig = app.get(ApiConfigService);

  app.enableShutdownHooks();

  app
    .setGlobalPrefix('v1')
    .useGlobalFilters(new HttpExceptionFilter(), new ZodExceptionFilter());
  await app.getHttpAdapter().getInstance().register(fastifyHelmet);

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

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
  mqttMicroservice.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(apiConfig.port, apiConfig.host);
}
bootstrap();
