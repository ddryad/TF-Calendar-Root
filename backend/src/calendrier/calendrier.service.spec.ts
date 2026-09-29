import { Test, TestingModule } from '@nestjs/testing';
import { CalendrierService } from './calendrier.service';

describe('CalendrierService', () => {
  let service: CalendrierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendrierService],
    }).compile();

    service = module.get<CalendrierService>(CalendrierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
