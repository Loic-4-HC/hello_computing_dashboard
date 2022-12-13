import { CreatePermissionDto } from 'src/permission/dto/create-permission.dto';
import { UpdatePermissionDto } from 'src/permission/dto/update-permission.dto';

export function SanitizeData(
  permission: CreatePermissionDto | UpdatePermissionDto,
): CreatePermissionDto {
  const newPerm = new CreatePermissionDto();
  newPerm.name = permission.name.trim().toLowerCase();
  newPerm.description = permission.description.trim();
  return newPerm;
}
