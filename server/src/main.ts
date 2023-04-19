import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dotenvConfig } from './dotenv.config';
import * as cors from 'cors';

async function bootstrap() {
  dotenvConfig();
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(3010);
}
bootstrap();
