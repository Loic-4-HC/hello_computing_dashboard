import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { UpdateAdressDto } from './update-adress.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto {
//   email?: string;

//   firstName?: string;

//   lastName?: string;

//   profilImage?: string;

//   phoneNumber?: string;

//   //   @IsNotEmptyObject()
//   @ValidateNested()
//   @Type(() => UpdateAdressDto)
//   adresse: UpdateAdressDto;
// }
