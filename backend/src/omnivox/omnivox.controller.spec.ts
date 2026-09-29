import { Test, TestingModule } from '@nestjs/testing';
import { OmnivoxController } from './omnivox.controller';

describe('OmnivoxController', () => {
  let controller: OmnivoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OmnivoxController],
    }).compile();

    controller = module.get<OmnivoxController>(OmnivoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
