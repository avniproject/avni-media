import { Module } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { MediaViewerController } from './media-viewer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { S3Service } from 'src/s3/s3.Service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [DownloadJobs],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([DownloadJobs]),
  ],
  providers: [MediaViewerService, S3Service],
  controllers: [MediaViewerController],
})
export class MediaViewerModule {}
