import { Module } from '@nestjs/common';
import { AccountsModule } from 'src/accounts/accounts.module';
import { DbModule } from 'src/db/db.module';
import { rbacProviders } from './rbac.providers';
import { RbacService } from './rbac.service';

@Module({
  imports: [DbModule, AccountsModule],
  providers: [RbacService, ...rbacProviders],
})
export class RbacModule {}
