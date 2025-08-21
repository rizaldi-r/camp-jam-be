import { Test, TestingModule } from '@nestjs/testing';
import { SubdescriptionsController } from './subdescriptions.controller';
import { SubdescriptionsService } from './subdescriptions.service';

describe('SubdescriptionsController', () => {
  let controller: SubdescriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubdescriptionsController],
      providers: [SubdescriptionsService],
    }).compile();

    controller = module.get<SubdescriptionsController>(SubdescriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
