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
  @IsString({
    message: 'email must be a string',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(3, {
    message: 'first name must be at least 2 characters',
  })
  firstName: string;

  @MinLength(3, {
    message: 'last name must be at least 2 characters',
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
  @MinLength(7, {
    message: 'phone number must be at least 7 characters', // smallest digit number according to international phone numbering plan (ITU-T E. 164)
  })
  phoneNumber?: string;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAdresseDto)
  adresse: CreateAdresseDto;
}
