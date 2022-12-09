import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../utils/custom-exeption.filter';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const isUserExisting = await this.findUserByEmail(createUserDto.email);

    if (isUserExisting !== null) {
      // user already exisiting
      throw new CustomException(
        'invalid input : user already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    // new user
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    const users = await this.userRepository.find();

    if (users === null) {
      throw new CustomException('No user found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const isUserExisting = await this.findUserByEmail(updateUserDto.email);

    if (isUserExisting !== null) {
      // user already exisiting
      throw new CustomException(
        'invalid input : user already existing',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
