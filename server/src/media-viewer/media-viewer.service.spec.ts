import { Test, TestingModule } from "@nestjs/testing";
import { MediaViewerService } from "./media-viewer.service";

describe("MediaViewerService", () => {
  let service: MediaViewerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaViewerService],
    }).compile();

    service = module.get<MediaViewerService>(MediaViewerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
