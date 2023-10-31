import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '@infra/app.module';
import { AllExceptionsFilter } from '@infra/filters';
import { LoggerInterceptor } from '@infra/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('This Api gateway is the entrypoint')
    .setVersion('1.0')
    .addTag('api-gateway')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.getOrThrow<number>('PORT');
  await app.listen(port);
}

bootstrap().then(() => console.log('API Gateway running on 8080...'));
