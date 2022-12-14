import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateAdresseDto } from './create-adress.dto';

export class User {
  @ApiPropertyOptional({
    type: String,
    format: 'uuid',
    example: '33a9af8e-5eee-4f09-8b46-e48ad50fb950',
  })
  uid: string;

  @ApiPropertyOptional({
    example: 'example@example.cm',
  })
  email: string;

  @ApiPropertyOptional({
    example: 'John',
  })
  firstName: string;

  @ApiPropertyOptional({
    example: 'Nsame',
  })
  lastName: string;

  @ApiPropertyOptional({
    example: 'Nsame John',
  })
  fullName: string;

  @ApiPropertyOptional({
    example: 'to complete',
  })
  profilImage: string;

  @ApiPropertyOptional({
    example: '656281827',
  })
  phoneNumber: string;

  @ApiPropertyOptional({
    example: '',
  })
  @Type(() => CreateAdresseDto)
  adresse: CreateAdresseDto;

  @ApiPropertyOptional({
    type: Date,
    format: 'timestamptz',
    example: '2022-12-12T15:35:25.701Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    type: Date,
    format: 'timestamptz',
    example: '2022-12-12T15:35:25.701Z',
  })
  updatedAt: Date;
}
