import { ApiProperty } from "@nestjs/swagger";
import { MinLength, Matches } from "class-validator";

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Has to match a regular expression: /(w:w)/',
    example: 'product:create',
  })
  @MinLength(3, {
    message: 'name should be at least 3 characters',
  })
  // @Matches(/([a-z]:(create|update|delete))$/, {
  @Matches(/(\w:\w)/, {
    message: 'name does respect the norm. ex : product:create',
  })
  name: string;

  @MinLength(8, {
    message: 'description should be at least 8 characters',
  })
  description?: string;
}
