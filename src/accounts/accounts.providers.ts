import { injectedConsts } from 'src/global.constants';
import { Connection } from 'typeorm';
import { Account } from './entities/accounts.entity';
import { Module } from './entities/modules.entity';

export const ACCOUNTS_REPOSITORY = 'ACCOUNTS_REPOSITORY';
export const MODULES_REPOSITORY = 'MODULES_REPOSITORY';

export const accountsProviders = [
  {
    provide: ACCOUNTS_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Account),
    inject: [injectedConsts.DATABASE_CONNECTION],
  },
  {
    provide: MODULES_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Module),
    inject: [injectedConsts.DATABASE_CONNECTION],
  },
];
