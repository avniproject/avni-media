import { Test, TestingModule } from '@nestjs/testing';
import { MediaViewerController } from './media-viewer.controller';

describe('MediaViewerController', () => {
  let controller: MediaViewerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaViewerController],
    }).compile();
    controller = module.get<MediaViewerController>(MediaViewerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
