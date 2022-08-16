import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import 'core-js/es/reflect';

import { AppModule } from './app.module';
import { PrismaService } from './common/infra/database/prisma.service';
import { HttpExceptionFilter } from './common/infra/http/filters/http-exception.filter';
import { ZodExceptionFilter } from './common/infra/http/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? '0.0.0.0';

  const prisma = app.get(PrismaService);

  app.setGlobalPrefix('v1');
  app.useGlobalFilters(new ZodExceptionFilter(), new HttpExceptionFilter());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await prisma.enableShutdownHooks(app);

  await app.listen(port, host);
}
bootstrap();
