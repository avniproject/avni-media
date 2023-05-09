import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaViewerService } from '../media-viewer/media-viewer.service';

@Injectable()
export class DownloadMediaTask {
  private readonly logger = new Logger(DownloadMediaTask.name);

  constructor(private readonly mediaViewerService: MediaViewerService) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  async runTask() {
    try {
      this.logger.debug('Starting running the cron.');
      const result = await this.mediaViewerService.getMediaData();
      this.logger.debug(`Cron complete: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error(`Error downloading media: ${error}`);
    }
  }
}
