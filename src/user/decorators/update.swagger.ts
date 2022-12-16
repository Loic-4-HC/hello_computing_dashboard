import { applyDecorators } from '@nestjs/common/decorators';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an existing user',
    }),
    ApiParam({
      name: 'updateUserDto',
      required: true,
      description: 'updated user information',
      type: UpdateUserDto,
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: 'A new user was succesfully created',
      type: User,
    }),
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID value.',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Validation failed (uuid is expected)',
        },
      },
    }),
    ApiResponse({
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
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User was not found',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
      },
    }),
  );
}
