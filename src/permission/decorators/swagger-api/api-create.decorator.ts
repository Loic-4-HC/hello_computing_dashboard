import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOAuth2,
  ApiParam,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreatePermissionDto } from '../../dto/create-permission.dto';
import { Permission } from '../../dto/permission.dto';

export function ApiCreate() {
  return applyDecorators(
    // ApiBearerAuth(),
    ApiOAuth2(['permission:create']),
    ApiParam({
      name: 'createPermissionDto',
      required: true,
      description: 'It must be a new permission',
      type: CreatePermissionDto,
    }),
    ApiOperation({
      summary: 'Add a new permission',
    }),
    ApiCreatedResponse({
      status: HttpStatus.CREATED,
      type: Permission,
      description: 'The permission have been successfully created',
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
