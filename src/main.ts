import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const port = process.env.PORT ?? 3000;
  const host = process.env.HOST ?? '0.0.0.0';

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(port, host);
}
bootstrap();
