import { injectedConsts } from 'src/global.constants';
import { Connection } from 'typeorm';
import { User } from './entities/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [injectedConsts.DATABASE_CONNECTION],
  },
];
