import { Test, TestingModule } from '@nestjs/testing';
import { ProgrammableService } from './programmable.service';

describe('ProgrammableService', () => {
  let service: ProgrammableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgrammableService],
    }).compile();

    service = module.get<ProgrammableService>(ProgrammableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
