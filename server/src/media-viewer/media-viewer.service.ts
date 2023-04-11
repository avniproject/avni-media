import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DownloadJobs } from "src/entity/media.entity";

@Injectable()
export class MediaViewerService {
  constructor(
    @InjectRepository(DownloadJobs)
    private readonly mediaRepository: Repository<DownloadJobs>
  ) {}

  async saveMediaData(mediaData: any): Promise<DownloadJobs> {
    const media = new DownloadJobs();
    media.username = mediaData.username;
    media.image_metadata = mediaData.data;
    media.zip_url = "wwww.images.com";
    return await this.mediaRepository.save(media);
  }
}
