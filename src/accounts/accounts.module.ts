import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { accountsProviders } from './accounts.providers';
import { AccountsService } from './accounts.service';

@Module({
  imports: [DbModule],
  providers: [AccountsService, ...accountsProviders],
  exports: [AccountsService],
})
export class AccountsModule {}
