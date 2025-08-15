import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionTemplatesController } from './submission-templates.controller';
import { SubmissionTemplatesService } from './submission-templates.service';

describe('SubmissionTemplatesController', () => {
  let controller: SubmissionTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionTemplatesController],
      providers: [SubmissionTemplatesService],
    }).compile();

    controller = module.get<SubmissionTemplatesController>(SubmissionTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
