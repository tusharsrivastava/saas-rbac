import { injectedConsts } from 'src/global.constants';
import { Connection } from 'typeorm';
import { Role, RoleMap } from './entities/roles.entity';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';
export const ROLE_MAP_REPOSITORY = 'ROLE_MAP_REPOSITORY';

export const rbacProviders = [
  {
    provide: ROLE_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: [injectedConsts.DATABASE_CONNECTION],
  },
  {
    provide: ROLE_MAP_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(RoleMap),
    inject: [injectedConsts.DATABASE_CONNECTION],
  },
];
