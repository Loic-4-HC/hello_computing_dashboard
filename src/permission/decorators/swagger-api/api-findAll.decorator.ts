import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { PermissionDto } from '../../dto/permission.dto';
export function ApiFindAll() {
  return applyDecorators(
    ApiOperation({
      summary: 'Find all permissions',
      description: 'Return all the permissions',
    }),
    ApiOkResponse({
      status: HttpStatus.OK,
      description: 'Successful operation.',
      type: PermissionDto,
      isArray: true,
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
  );
}
