import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiResponse } from '@nestjs/swagger';
import { ApiCreate } from '../decorators/swagger/api-create.decorator';
import { ApiDelete } from '../decorators/swagger/api-delete.decorator';
import { ApiFindAll } from '../decorators/swagger/api-findAll.decorator';
import { ApiFindOne } from '../decorators/swagger/api-findOne.decorator';
import { ApiUpdate } from '../decorators/swagger/api-update.decorator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UserService,
  ) {}

  @Post()
  @ApiCreate()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  // @Post(':id/uploadImage')
  // async uploadProfilImage(@Param('id') id : string, @Body() upLoadImageDto: UploadImageDto){}

  @Get()
  @ApiFindAll()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiFindOne()
  async findOne(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @Patch(':id')
  @ApiUpdate()
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiDelete()
  async remove(@Param('id') id: string) {
    return await this.userService.remove(id);
  }
}
