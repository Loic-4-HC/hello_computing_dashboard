import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CustomException } from '../../utils/custom-exeption.filter';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { PermissionService } from '../service/permission.service';
import { PermissionController } from './permission.controller';

describe('PermissionController Unit Tests', () => {
  let controller: PermissionController;
  let permissionService: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [
        {
          provide: 'PERMISSION_SERVICE',
          useValue: {
            createPermission: jest.fn((x) => x),
          },
        },
      ],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
    permissionService = module.get<PermissionService>('PERMISSION_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('permissionService should be defined', () => {
    expect(permissionService).toBeDefined();
  });

  describe('createPermission', () => {
    it('should return a CreatePermssion object', async () => {
      const reponse = await controller.createPermission({
        name: 'product:create',
        description: 'access to create a product',
      });
      expect(reponse).toBe({
        name: 'product:create',
        description: 'access to create a product',
      });
    });

    it('should return an error', async () => {
      jest
        .spyOn(permissionService, 'createPermission')
        .mockImplementationOnce(() => {
          throw new CustomException(
            'invalid input -- permission name is already taken',
            HttpStatus.BAD_REQUEST,
          );
        });

      const response = await controller.createPermission({
        name: 'product:create',
        description: 'access to create a product',
      });
    });
  });
});
