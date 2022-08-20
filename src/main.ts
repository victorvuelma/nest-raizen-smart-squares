import 'core-js/es/reflect';

import fastifyHelmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
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

  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new HttpExceptionFilter(), new ZodExceptionFilter());

  await app.getHttpAdapter().getInstance().register(fastifyHelmet);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  const prisma = app.get(PrismaService);
  await prisma.enableShutdownHooks(app);

  const apiConfig = app.get(ApiConfigService);
  await app.listen(apiConfig.port, apiConfig.host);
}
bootstrap();
