import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findPermissionByName(name: string): Promise<PermissionEntity> {
    return await this.permissionRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  async createPermission(createPermissionDto: CreatePermissionDto) {
    //permission not isPermsíssion
    const isPermissionExisting = await this.findPermissionByName(
      createPermissionDto.name,
    );

    // better to check name
    if (isPermissionExisting !== null) {
      // permission name is already taken
      throw new CustomException('invalid input', HttpStatus.BAD_REQUEST);
    }

    // new user
    const newPermission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(newPermission);
  }

  async findAllPermissions() {
    const permissions = await this.permissionRepository.find();

    if (Array.isArray(permissions)) {
      return permissions;
    }
    throw new CustomException('No permission found', HttpStatus.NOT_FOUND);
  }

  async findPermissionById(id: number): Promise<PermissionEntity> {
    return await this.permissionRepository
      .findOne({
        where: {
          id: id,
        },
      })
      .catch((e) => {
        console.error(
          'failed to findPermissionById .throw ',
          JSON.stringify(e),
        );
        throw new CustomException('Permission not found', HttpStatus.NOT_FOUND);
      });
  }

  async updatePermission(id: number, updatePermissionDto: UpdatePermissionDto) {
    const isPermissionExisting = await this.findPermissionByName(
      updatePermissionDto.name,
    );

    if (isPermissionExisting === null) {
      // permission does not exists
      throw new CustomException('invalid input', HttpStatus.NOT_FOUND);
    }

    return await this.permissionRepository.update(id, {
      name: updatePermissionDto.name,
      description: updatePermissionDto.description,
    });
  }
}
