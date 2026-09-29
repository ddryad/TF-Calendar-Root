import { Test, TestingModule } from '@nestjs/testing';
import { OmnivoxService } from './omnivox.service';

describe('OmnivoxService', () => {
  let service: OmnivoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OmnivoxService],
    }).compile();

    service = module.get<OmnivoxService>(OmnivoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
