import { ConfigService } from '@nestjs/config';
import { injectedConsts } from 'src/global.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: injectedConsts.DATABASE_CONNECTION,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dbSync: boolean =
        configService.get<string>('DB_SYNC', 'false') === 'true';
      const dblogging: boolean =
        configService.get<string>('DB_LOGGING', 'false') === 'true';

      return await createConnection({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_SCHEMA'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: dbSync,
        logging: dblogging,
      });
    },
  },
];
