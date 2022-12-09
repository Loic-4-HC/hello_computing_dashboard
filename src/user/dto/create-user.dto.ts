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
import { CreateAdresseDto } from '../../adresse/dto/create-adresse.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3, {
    message: 'first name should be at least 2 characters',
  })
  firstName: string;

  @MinLength(3, {
    message: 'last name should be at least 2 characters',
  })
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'user shlould have a profil ia',
  })
  profilImage?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'phone number should be at least 2 characters',
  })
  phoneNumber?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAdresseDto)
  adresse: CreateAdresseDto;
}
