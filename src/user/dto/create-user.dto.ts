import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAdresseDto } from '../dto/create-adress.dto';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@example.cm',
  })
  @IsString({
    message: 'email must be a string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'John',
  })
  @IsString()
  @MinLength(3, {
    message: 'first name must be at least 2 characters',
  })
  firstName: string;

  @ApiProperty({
    example: 'Nsame',
  })
  @IsString()
  @MinLength(3, {
    message: 'last name must be at least 2 characters',
  })
  lastName: string;

  // fullName?: string;

  @ApiPropertyOptional({
    example: 'to complete',
  })
  @IsString()
  profilImage?: string;

  @ApiPropertyOptional({
    example: '695838293',
  })
  @IsOptional()
  @IsString()
  @MinLength(7, {
    message: 'phone number must be at least 7 characters', // smallest digit number according to international phone numbering plan (ITU-T E. 164)
  })
  phoneNumber?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAdresseDto)
  adresse: CreateAdresseDto;
}
