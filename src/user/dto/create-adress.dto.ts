import { IsNotEmpty } from 'class-validator';

export class CreateAdresseDto {
  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  zipCode: string;

  additionalDescription?: string;
}
