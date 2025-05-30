import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const connectionstring =
          configService.getOrThrow<string>('POSTGRES_URL');
        return {
          type: 'postgres',
          url: connectionstring,
          autoLoadEntities: true,
          synchronize: configService.getOrThrow<boolean>('DB_SYNC', true),
          logging: configService.getOrThrow<boolean>('DB_LOGGING', false),
          migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
