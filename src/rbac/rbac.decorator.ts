import { SetMetadata } from '@nestjs/common';
import { Operation } from './rbac.enums';

export const Rbac = (moduleName: string, op: Operation) => {
  SetMetadata('module', moduleName);
  SetMetadata('operation', op);
};
