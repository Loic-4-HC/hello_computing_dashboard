import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Permission } from '../../dto/permission.dto';
import { UpdatePermissionDto } from '../../dto/update-permission.dto';

export function ApiUpdate() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an existing permission',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      type: Permission,
      description: 'Successful operation.',
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
      name: 'updatePermissionDto',
      type: UpdatePermissionDto,
    }),
  );
}
