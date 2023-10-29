import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { DataSource, DataSourceOptions } from 'typeorm';
import { CartRepository } from '@domain/cart/repositories';
import { ItemRepository } from '@domain/item/repositories';
import {
  TypeOrmCartRepository,
  TypeOrmItemRepository,
} from './typeorm/repositories';

@Module({
  providers: [
    {
      provide: 'TYPEORM_CONNECTION',
      useFactory: (cs: ConfigService) => {
        const dataSourceOptions: DataSourceOptions = {
          type: 'postgres',
          host: cs.getOrThrow<string>('DATABASE_HOST'),
          port: cs.getOrThrow<number>('DATABASE_PORT'),
          username: cs.getOrThrow<string>('DATABASE_USER'),
          password: cs.getOrThrow<string>('DATABASE_PASS'),
          database: cs.getOrThrow<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity.js'],
          migrations: ['dist/infra/database/typeorm/migrations/*.js'],
          useUTC: false,
        };
        return new DataSource(dataSourceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: CartRepository,
      useClass: TypeOrmCartRepository,
    },
    {
      provide: ItemRepository,
      useClass: TypeOrmItemRepository,
    },
  ],
  exports: [CartRepository, ItemRepository],
})
export class DatabaseModule {}
