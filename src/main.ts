import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from 'http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

    const httpAdapterHost = app.get(HttpAdapterHost);
  // Register the global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is running on: ${process.env.PORT ?? 3000}`);
}
bootstrap();
