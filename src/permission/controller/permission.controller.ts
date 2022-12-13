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
import { ApiTags } from '@nestjs/swagger';
import { SanitizeData } from '../../utils/sanitizeData.filter';
import { ApiCreate } from '../decorators/swagger-api/api-create.decorator';
import { ApiFindAll } from '../decorators/swagger-api/api-findAll.decorator';
import { ApiFindOne } from '../decorators/swagger-api/api-findOne.decorator';
import { ApiUpdate } from '../decorators/swagger-api/api-update.decorator';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionService } from '../service/permission.service';

@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(
    @Inject('PERMISSION_SERVICE')
    private readonly permissionService: PermissionService,
  ) {}

  @Post('')
  @ApiCreate()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    const createPerm = SanitizeData(createPermissionDto);
    return this.permissionService.createPermission(createPerm);
  }

  @Get('')
  @ApiFindAll()
  async findAllPermission() {
    return await this.permissionService.findAllPermissions();
  }

  @Get(':id')
  @ApiFindOne()
  async findOnePermission(@Param('id') id: string) {
    return await this.permissionService.findPermissionById(id);
  }

  @Patch(':id')
  @ApiUpdate()
  async updatePermission(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    const updatePerm = SanitizeData(updatePermissionDto);
    return await this.permissionService.updatePermission(id, updatePerm);
  }
}
