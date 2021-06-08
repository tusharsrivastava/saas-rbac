import { RoleDto } from 'src/rbac/dto/role.dto';

export class CreateUserDto {
  id?: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  profileThumbnail?: string;
  role?: RoleDto;
}
