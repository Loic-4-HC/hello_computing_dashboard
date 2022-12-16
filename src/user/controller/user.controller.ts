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
import { ApiTags } from '@nestjs/swagger';
import { ApiCreate } from '../decorators/create.swagger';
import { ApiDelete } from '../decorators/delete.swagger';
import { ApiFindAll } from '../decorators/find-all.swagger';
import { ApiFindOne } from '../decorators/find-one.swagger';
import { ApiUpdate } from '../decorators/update.swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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
