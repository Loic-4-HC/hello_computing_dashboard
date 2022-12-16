import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '../../utils/custom-exeption.filter';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';
import { Permission } from '../dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>, // private readonly logger: PinoLogger,
  ) {}

  private readonly logger = new Logger(PermissionService.name);

  async createPermission(createPermissionDto: CreatePermissionDto) {
    //permission not is Permsíssion
    const isPermissionExisting = await this.findPermissionByName(
      createPermissionDto.name,
    );

    if (isPermissionExisting?.name) {
      // permission name is already taken
      const error = new CustomException(
        `Invalid input. The permission name ${isPermissionExisting.name} is already taken`,
        HttpStatus.BAD_REQUEST,
      );
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }

    const prm = Permission.initialize(createPermissionDto);
    const newPermission = this.permissionRepository.create(prm);
    return this.permissionRepository.save(newPermission);
  }

  async findAllPermissions() {
    const permissions = await this.permissionRepository.find();

    if (Array.isArray(permissions)) {
      return permissions;
    }
    const error = new CustomException(
      'No permission found',
      HttpStatus.NOT_FOUND,
    );
    this.logger.error(`${JSON.stringify(error)}`);
    throw error;
  }

  async findPermissionById(id: string): Promise<PermissionEntity> {
    return await this.permissionRepository
      .findOne({
        where: {
          id: id,
        },
      })
      .catch((error) => {
        this.logger.error(
          `Failed to findPermissionById with the id ${id} \n
          data : ${JSON.stringify(error)}`,
        );

        throw new CustomException('Permission not found', HttpStatus.NOT_FOUND); // to improve -- always log errors
      });
  }

  async findPermissionByName(name: string): Promise<PermissionEntity> {
    return await this.permissionRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto) {
    const initialPermission = await this.findPermissionById(id);

    //get the permission we want to update through its ID
    if (initialPermission) {
      //check to know if the name we want to update the permission with, is already taken
      const findByname = await this.findPermissionByName(
        updatePermissionDto?.name,
      );
      if (findByname) {
        // if a permission with the same name already exist throw an error
        const error = new CustomException(
          `Invalid input. The name ${updatePermissionDto.name} is already taken`,
          HttpStatus.BAD_REQUEST,
        );
        this.logger.error(`${JSON.stringify(error)}`);
        throw error;
      }

      // check if permission to be updated has a description when the initial permission is empty, if not throw an error
      if (
        !initialPermission?.description &&
        !updatePermissionDto?.description
      ) {
        const error = new CustomException(
          'Invalid input -- need to add a description',
          HttpStatus.NOT_FOUND,
        );
        this.logger.error(
          `Invalid input -- need to add a description \n data : ${JSON.stringify(
            error,
          )}`,
        );
        throw error;
      }

      await this.permissionRepository.update(id, updatePermissionDto);
      return this.findPermissionById(id);
    }

    //a permission with this Id does not exist
    const error = new CustomException(
      `A permission with the ID ${id} does not exist.`,
      HttpStatus.NOT_FOUND,
    );
    this.logger.error(`${JSON.stringify(error)}`);
    throw error;
  }
}
