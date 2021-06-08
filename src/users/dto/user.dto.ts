import { RoleDto } from 'src/rbac/dto/role.dto';

export class UserDto {
  id: string;
  username: string;
  profileThumbnail: string;
  firstName: string;
  lastName: string;
  role: RoleDto;
}
