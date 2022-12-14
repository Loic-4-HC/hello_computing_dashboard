import { HttpStatus } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { User } from '../../dto/user.dto';

export function ApiFindOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find user by ID',
      description: 'Return a single user',
    }),
    ApiParam({
      name: 'id',
      required: true,
      description: 'ID of the researched user',
      type: String,
      format: 'uuid',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: 'Successful operation',
      type: User,
    }),
    ApiBadRequestResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid input.',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid input',
        },
      },
    }),
    ApiForbiddenResponse({
      status: HttpStatus.FORBIDDEN,
      description: 'UnauthorizedException',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.FORBIDDEN,
          message: 'UnauthorizedException',
        },
      },
    }),
    ApiNotFoundResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'User was not found',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'User was not found',
        },
      },
    }),
  );
}
