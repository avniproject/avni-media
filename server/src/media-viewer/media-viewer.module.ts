import { Module } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { MediaViewerController } from './media-viewer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DownloadJobs } from 'src/entity/media.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'postgres',
      entities:[DownloadJobs],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([DownloadJobs]),
    
  ],
  providers: [MediaViewerService],
  controllers: [MediaViewerController]
})
export class MediaViewerModule {}
