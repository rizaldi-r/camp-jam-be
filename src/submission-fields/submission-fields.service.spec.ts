import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionFieldsService } from './submission-fields.service';

describe('SubmissionFieldsService', () => {
  let service: SubmissionFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubmissionFieldsService],
    }).compile();

    service = module.get<SubmissionFieldsService>(SubmissionFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
