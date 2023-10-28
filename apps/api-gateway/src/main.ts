import { NestFactory } from '@nestjs/core';

import { AppModule } from '@infra/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}

bootstrap().then(() => console.log('API Gateway running...'));
