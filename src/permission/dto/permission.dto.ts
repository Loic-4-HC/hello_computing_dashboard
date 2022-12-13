import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty({
    example: '33a9af8e-5eee-4f09-8b46-e48ad50fb950',
    type: String,
    format: 'uuid',
  })
  id: string;

  @ApiPropertyOptional({
    example: 'product:create',
  })
  name: string;

  @ApiPropertyOptional({
    example: 'access to create a product',
  })
  description: string;

  @ApiPropertyOptional({
    example: '2022-12-12T15:35:25.701Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    example: '2022-12-12T15:35:25.701Z',
  })
  updatedAt: Date;
}

// export function InsertInPermissionDto(permissionDto) {
//   return new PermissionDto(...permissionDto);
// }
