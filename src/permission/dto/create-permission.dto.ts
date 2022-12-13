import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  MinLength,
  Matches,
  IsString,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Has to match a regular expression: /(w:w)/.',
    example: 'product:create',
  })
  @IsString({
    // message: 'Name must be a string.',
  })
  @MinLength(3, {
    // message: 'Name must be at least 3 characters',
  })
  // @Matches(/([a-z]:(create|update|delete))$/, {
  @Matches(/(\w:\w)/, {
    message: 'Name must respect the norm. ex : product:create .',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Describe the access a permission give to an user',
    example: 'access to create a product',
  })
  @IsOptional()
  @MinLength(8, {
    // message: 'description must be at least 8 characters',
  })
  description?: string;
}
