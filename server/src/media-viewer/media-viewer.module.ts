import { Module } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { MediaViewerController } from './media-viewer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { S3Service } from 'src/s3/s3.Service';
import { ConfigModule } from '@nestjs/config';
import { FileUtility } from 'src/fileUtility/file-size';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AVNI_MEDIA_DB_HOST,
      port: parseInt(process.env.AVNI_MEDIA_DB_PORT, 10),
      username: process.env.AVNI_MEDIA_DB_USERNAME,
      password: process.env.AVNI_MEDIA_DB_PASSWORD,
      database: process.env.AVNI_MEDIA_DB_DATABASE,
      entities: [DownloadJobs],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([DownloadJobs]),
  ],
  providers: [MediaViewerService, S3Service,FileUtility],
  controllers: [MediaViewerController],
})
export class MediaViewerModule {}
