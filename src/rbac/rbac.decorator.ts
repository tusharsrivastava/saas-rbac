import { SetMetadata } from '@nestjs/common';
import { Operation } from './rbac.enums';

export const Rbac = (moduleKey: string, op: Operation) => {
  SetMetadata('moduleKey', moduleKey);
  SetMetadata('operation', op);
};
