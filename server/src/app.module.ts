import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaViewerModule } from './media-viewer/media-viewer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DownloadMediaTask } from './tasks/download.task';
import { MediaViewerService } from './media-viewer/media-viewer.service';
import { S3Service } from './s3/s3.Service';
import { DownloadJobs } from './entity/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { FileUtility } from './utils/file-utility';

@Module({
  imports: [
    MediaViewerModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([DownloadJobs]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DownloadMediaTask,
    MediaViewerService,
    S3Service,
    ConfigService,
    FileUtility,
  ],
})
export class AppModule {}
