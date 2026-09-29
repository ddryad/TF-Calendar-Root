import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammableController } from './programmable.controller';

describe('ProgrammableController', () => {
  let controller: ProgrammableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgrammableController],
    }).compile();

    controller = module.get<ProgrammableController>(ProgrammableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
