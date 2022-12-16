import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export function ApiCreate() {
  return applyDecorators(
    ApiOperation({
      summary: 'add new user',
    }),
    ApiParam({
      name: 'createUserDto',
      required: true,
      description: 'it must be a new user',
      type: CreateUserDto,
    }),
    ApiCreatedResponse({
      status: HttpStatus.CREATED,
      description: 'A new user was succesfully created',
      type: User,
    }),
    ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid Input.',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid Input.',
        },
      },
    }),
    ApiForbiddenResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'Unauthorized access',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'Unauthorized access',
        },
      },
    }),
  );
}
