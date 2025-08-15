import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionTemplatesService } from './submission-templates.service';

describe('SubmissionTemplatesService', () => {
  let service: SubmissionTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionTemplatesService],
    }).compile();

    service = module.get<SubmissionTemplatesService>(SubmissionTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
