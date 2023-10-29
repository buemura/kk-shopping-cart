import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CartModule } from '@api/cart';
import { HealthModule } from '@api/health';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    HealthModule,
    CartModule,
  ],
})
export class AppModule {}
