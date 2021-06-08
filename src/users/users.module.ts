import { Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { DbModule } from 'src/db/db.module';
import { RbacModule } from 'src/rbac/rbac.module';
import { UsersController } from './users.controller';
import { userProviders } from './users.provider';
import { UsersService } from './users.service';

@Module({
  imports: [DbModule, AccountsModule, RbacModule],
  providers: [UsersService, ...userProviders],
  controllers: [UsersController],
  exports: [UsersService, ...userProviders],
})
export class UsersModule {}
