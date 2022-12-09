import { ApiProperty } from '@nestjs/swagger';
import { MinLength, Matches, IsString, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Has to match a regular expression: /(w:w)/',
    example: 'product:create',
  })
  @IsString({
    message: 'name must be a string',
  })
  @MinLength(3, {
    message: 'name must be at least 3 characters',
  })
  // @Matches(/([a-z]:(create|update|delete))$/, {
  @Matches(/(\w:\w)/, {
    message: 'name must respect the norm. ex : product:create',
  })
  name: string;

  @IsOptional()
  @MinLength(8, {
    message: 'description must be at least 8 characters',
  })
  description?: string;
}
