import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaViewerService } from '../media-viewer/media-viewer.service';

@Injectable()
export class DownloadMediaTask {
  private readonly logger = new Logger(DownloadMediaTask.name);

  constructor(private readonly mediaViewerService: MediaViewerService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async runTask() {
    try {
      this.logger.log('Starting running the cron.');
      const result = await this.mediaViewerService.createZipOfMediaFiles();
      this.logger.log(`Cron complete: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error(`Error downloading media: ${error}`);
    }
  }
}
