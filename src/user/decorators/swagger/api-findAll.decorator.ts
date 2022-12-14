import { HttpStatus } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from 'src/user/dto/user.dto';

export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all users',
      description: 'Return all users',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: 'Succesful operation',
      type: User,
      isArray: true,
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
