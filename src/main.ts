import { NestFactory } from '@nestjs/core';
import { prepareInit } from './utils/prepareInit';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
// somewhere in your initialization file


async function bootstrap() {
  prepareInit();
  const { AppModule } = await import('./app.module');

  const app = await NestFactory.create(AppModule);
  app.use(compression());
  // somewhere in your initialization file
  app.use(cookieParser());
  app.use(function (req, res, next) {
    const old_url = req.url
    if (old_url.includes('/api')) {
      req.url = old_url.replace('/api', '')
    }
    next()
  })
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
