import { IsOptional, IsString } from 'class-validator';

export class UpdateAdressDto {
  country?: string;

  @IsOptional()
  city?: string;

  @IsOptional()
  street?: string;

  @IsOptional()
  zipCode?: string;

  @IsString()
  @IsOptional()
  additionalDescription?: string;
}
