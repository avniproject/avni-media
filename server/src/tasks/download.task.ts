import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MediaViewerService } from '../media-viewer/media-viewer.service';

@Injectable()
export class DownloadMediaTask {
  constructor(private readonly mediaViewerservice: MediaViewerService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async runTask() {
    console.log('Task is running...');
    const result = await this.mediaViewerservice.getMediaData();
    console.log('Task is completed...', result);
  }
}
