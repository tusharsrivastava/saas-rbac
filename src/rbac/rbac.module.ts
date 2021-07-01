import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from 'src/accounts/accounts.module';
import { Role, RoleMap } from './entities/roles.entity';
import { RbacService } from './rbac.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RoleMap]), AccountsModule],
  providers: [RbacService],
})
export class RbacModule {}
