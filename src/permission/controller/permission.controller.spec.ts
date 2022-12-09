import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from '../service/permission.service';
import { PermissionController } from './permission.controller';

describe('PermissionController', () => {
  let controller: PermissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionController],
      providers: [PermissionService],
    }).compile();

    controller = module.get<PermissionController>(PermissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
