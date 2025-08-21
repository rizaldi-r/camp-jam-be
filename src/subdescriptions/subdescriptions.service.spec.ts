import { Test, TestingModule } from '@nestjs/testing';
import { SubdescriptionsService } from './subdescriptions.service';

describe('SubdescriptionsService', () => {
  let service: SubdescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubdescriptionsService],
    }).compile();

    service = module.get<SubdescriptionsService>(SubdescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
