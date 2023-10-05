import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaViewerService } from '../media-viewer/media-viewer.service';
import { Mutex } from 'async-mutex';

@Injectable()
export class DownloadMediaTask {
  private readonly logger = new Logger(DownloadMediaTask.name);

  constructor(private readonly mediaViewerService: MediaViewerService) {}
  private mutex = new Mutex();
  @Cron(CronExpression.EVERY_MINUTE)
  async runTask() {
    if (!this.mutex.isLocked()) {
      const release = await this.mutex.acquire();
      try {
        this.logger.log('Starting running the cron.');
        const result = await this.mediaViewerService.createZipOfMediaFiles();
        this.logger.log(`Cron complete: ${JSON.stringify(result)}`);
        release();
      } catch (error) {
        this.logger.error(`Error downloading media: ${error}`);
        release();
      }
    } else {
      this.logger.log(
        'Skipping cron invocation because previous invocation has not completed',
      );
    }
  }
}
