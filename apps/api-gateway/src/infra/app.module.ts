import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HealthModule } from '@api/health';
import { ProductModule } from '@api/product';
import { CartModule } from '@api/cart';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    HealthModule,
    ProductModule,
    CartModule,
  ],
})
export class AppModule {}
