import { CreatePermissionDto } from '../permission/dto/create-permission.dto';
import { UpdatePermissionDto } from '../permission/dto/update-permission.dto';

export function SanitizeData(
  permission: CreatePermissionDto | UpdatePermissionDto,
): CreatePermissionDto {
  const newPerm = new CreatePermissionDto();
  newPerm.name = permission.name?.trim().toLowerCase();
  newPerm.description = permission.description?.trim().toLocaleLowerCase();
  return newPerm;
}
