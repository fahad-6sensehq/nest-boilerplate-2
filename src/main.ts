import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './infrastructure/config/app.config';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());

  const port = appConfig.port;
  await app.listen(port);

  console.log(`
    ==============================
    🚀 Application Configuration 🚀
    ==============================
    PORT         : ${port}
    Server Type  : ${appConfig.serverType}
    ==============================
  `);
}

bootstrap();
