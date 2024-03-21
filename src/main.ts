import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { genSalt } from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Starts listening for shutdown hooks

  console.log(await genSalt(15));

  app.enableShutdownHooks();

  await app.listen(3000);
}
bootstrap();
