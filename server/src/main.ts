import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dotenvConfig } from './dotenv.config';
import * as cors from 'cors';
import { json } from 'express';

async function bootstrap() {
  dotenvConfig();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.use(json({ limit: '50mb' }));
  await app.listen(3010);
}
bootstrap();
