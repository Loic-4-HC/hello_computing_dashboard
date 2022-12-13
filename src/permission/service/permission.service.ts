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
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  private readonly logger = new Logger(PermissionService.name);

  async findPermissionByName(name: string): Promise<PermissionEntity> {
    return await this.permissionRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    //permission not is Permsíssion
    const isPermissionExisting = await this.findPermissionByName(
      createPermissionDto.name,
    );

    if (isPermissionExisting?.name) {
      // permission name is already taken
      throw new CustomException(
        'invalid input -- permission name is already taken',
        HttpStatus.BAD_REQUEST,
      );
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
    throw new CustomException('No permission found', HttpStatus.NOT_FOUND);
  }

  async findPermissionById(id: string): Promise<PermissionEntity> {
    return await this.permissionRepository
      .findOne({
        where: {
          id: id,
        },
      })
      .catch((e) => {
        console.error('Failed to findPermissionById.throw ', JSON.stringify(e));
        throw new CustomException('Permission not found', HttpStatus.NOT_FOUND);
      });
  }

  async updatePermission(id: string, updatePermissionDto: UpdatePermissionDto) {
    const initialPermission = await this.findPermissionById(id);

    if (initialPermission) {
      if (
        (typeof initialPermission.description === 'undefined' ||
          initialPermission.description === null) &&
        (typeof updatePermissionDto.description === 'undefined' ||
          updatePermissionDto.description === null)
      ) {
        throw new CustomException(
          'Invalid input -- need to add a description',
          HttpStatus.NOT_FOUND,
        );
      }

      await this.permissionRepository.update(id, updatePermissionDto);
      return this.findPermissionById(id);
    }
    throw new CustomException('Invalid input', HttpStatus.NOT_FOUND);
  }
}
