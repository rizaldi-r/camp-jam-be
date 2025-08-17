import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from 'src/_common/filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // global error catching
  app.useGlobalFilters(new ExceptionsFilter());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
