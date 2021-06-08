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
    const moduleName = this.reflector.get<string>(
      'module',
      context.getHandler(),
    );
    const op = this.reflector.get<Operation>('operation', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return await this.checkIfAllowed(moduleName, op, user.role);
  }

  private async checkIfAllowed(
    moduleName: string,
    op: Operation,
    role: Role,
  ): Promise<boolean> {
    if (role.key === moduleName) {
      return await this.checkIfAllowed(moduleName, op, role);
    }

    return false;
  }
}
