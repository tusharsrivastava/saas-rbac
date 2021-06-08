import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { AccountsService } from './accounts.service';

@Module({
  imports: [DbModule],
  providers: [AccountsService],
})
export class AccountsModule {}
