import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/user/dto/user.dto';

export function ApiDelete() {
  return applyDecorators(
    ApiOperation({
      summary: 'delete an existing user',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: 'A user was succesfully deleted',
      type: User,
    }),
    ApiBadRequestResponse({
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
