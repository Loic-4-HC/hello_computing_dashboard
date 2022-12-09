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
  @ApiParam({
    name: 'createUserDto',
    required: true,
    description: 'it must be a new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A new user was succesfully created',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  // @ApiResponse({
  //   status: 201,
  //   description: 'A new user was succesfully created',
  //   type: CreateUserDto,
  // })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the researched user',
  })
  // @ApiResponse({
  //   status: 201,
  //   description: 'A new user was succesfully created',
  //   type: UserEntity,
  // })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'id of the ',
    type: UpdateUserDto,
  })
  @ApiParam({
    name: 'updateUserDto',
    required: true,
    description: 'updated user information',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A new user was succesfully created',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'CreateUserDto',
    required: true,
    description: 'it must be a new user',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'A new UserEntity was succesfully created',
    type: UserEntity,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input.',
  })
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
