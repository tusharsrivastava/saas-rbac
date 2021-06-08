import { Inject, Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Module } from 'src/accounts/entities/modules.entity';
import { Repository } from 'typeorm';
import { Role, RoleMap } from './entities/roles.entity';
import { Operation } from './rbac.enums';
import { ROLE_MAP_REPOSITORY, ROLE_REPOSITORY } from './rbac.providers';

@Injectable()
export class RbacService {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: Repository<Role>,
    @Inject(ROLE_MAP_REPOSITORY)
    private readonly rolemapRepo: Repository<RoleMap>,
    private readonly accountsService: AccountsService,
  ) {}

  async matchRolePermission(moduleKey: string, op: Operation, roleKey: string) {
    const role = await this.findRoleByKey(roleKey);
    const module = await this.accountsService.getModuleByKey(moduleKey);

    const rMap = await this.findRoleMap(role, module);
    if (rMap.length > 0) {
      const m = rMap[0];
      switch (op) {
        case Operation.READ:
          return m.canRead;
        case Operation.WRITE:
          return m.canWrite;
        default:
          return false;
      }
    }

    return false;
  }

  async findRoleByKey(key: string) {
    return await this.roleRepo.findOne({ key: key });
  }

  async findRoleMap(role: Role, module: Module) {
    return await this.rolemapRepo.find({
      role: role,
      module: module,
    });
  }
}
