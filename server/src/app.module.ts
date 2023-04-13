import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaViewerModule } from './media-viewer/media-viewer.module';

@Module({
  imports: [MediaViewerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
