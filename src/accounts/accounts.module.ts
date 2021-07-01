import { Module } from '@nestjs/common';
import {
  AbstractModule,
  SubModule,
  Module as ModuleEntity,
} from './entities/modules.entity';
import { AbstractUser } from './entities/abstractusers.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { Account } from './entities/accounts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AbstractModule,
      SubModule,
      ModuleEntity,
      AbstractUser,
      Account,
    ]),
  ],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
