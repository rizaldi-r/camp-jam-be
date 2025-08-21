import { Test, TestingModule } from '@nestjs/testing';
import { SubmissionFieldsController } from './submission-fields.controller';
import { SubmissionFieldsService } from './submission-fields.service';

describe('SubmissionFieldsController', () => {
  let controller: SubmissionFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubmissionFieldsController],
      providers: [SubmissionFieldsService],
    }).compile();

    controller = module.get<SubmissionFieldsController>(SubmissionFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
