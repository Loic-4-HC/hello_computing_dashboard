import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Permission } from '../dto/permission.dto';
export function ApiFindOne() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find  permission by ID',
      description: 'Return a single permission',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      type: Permission,
      description: 'Successful operation.',
    }),
    ApiNotFoundResponse({
      status: HttpStatus.BAD_REQUEST,
      description: 'Invalid ID supplied',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Permission not found',
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
          message: 'Unauthorized access',
        },
      },
    }),
    ApiNotFoundResponse({
      status: HttpStatus.NOT_FOUND,
      description: 'Permission was not found',
      schema: {
        type: 'object',
        example: {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Permission not found',
        },
      },
    }),
    ApiParam({
      name: 'id',
      type: String,
      format: 'uuid',
    }),
  );
}
