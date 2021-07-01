import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/roles.entity';
import { Operation } from './rbac.enums';
import { RbacService } from './rbac.service';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly service: RbacService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const moduleKey = this.reflector.get<string>(
      'moduleKey',
      context.getHandler(),
    );
    const op = this.reflector.get<Operation>('operation', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return await this.checkIfAllowed(moduleKey, op, user.role);
  }

  private async checkIfAllowed(
    moduleKey: string,
    op: Operation,
    role: Role,
  ): Promise<boolean> {
    return await this.service.matchRolePermission(moduleKey, op, role.key);
  }
}
