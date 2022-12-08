import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';
import { PermissionService } from '../service/permission.service';

@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(
    @Inject('PERMISSION_SERVICE')
    private readonly permissionService: PermissionService,
  ) {}

  @Post('')
  @ApiParam({
    name: 'createPermissionDto',
    required: true,
    description: 'it must be a new permission',
    type: CreatePermissionDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A new permission was succesfully created',
    type: PermissionEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.createPermission(createPermissionDto);
  }

  @Get('')
  async findAllPermission() {
    return await this.permissionService.findAllPermissions();
  }

  @Get(':id')
  async findOnePermission(@Param('id') id: number) {
    return await this.permissionService.findPermissionById(id);
  }

  @Patch('update/:uuid')
  // @UseGuards(PermissionGuard(ManagePermissions.UpdatePermission))
  async updatePermission(
    @Param('uuid', new ParseUUIDPipe()) uuid: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return await this.permissionService.updatePermission(
      uuid,
      updatePermissionDto,
    );
  }
}
