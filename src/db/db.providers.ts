import { injectedConsts } from 'src/global.constants';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: injectedConsts.DATABASE_CONNECTION,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT as unknown as number,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
  },
];
