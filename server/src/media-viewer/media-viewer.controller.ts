import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { S3Service } from 'src/s3/s3.Service';

@Controller('media-viewer')
export class MediaViewerController {
  constructor(
    private readonly mediaService: MediaViewerService,
    private readonly s3Service: S3Service, // @InjectQueue("downloadMedia") private readonly donwloadMediaQueue: Queue
  ) {}

  @Post('/requestDownload')
  async postMedia(@Body() body: any) {
    try {
      const savedMedia = await this.mediaService.saveMediaData(body);
      return body.data;
    } catch (error) {
      throw new HttpException(
        'Error saving media data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/download')
  async getData() {
    try {
      const result = await this.mediaService.getMediaData();
      return result;
    } catch (error) {
      throw new HttpException(
        'Error getting media data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/allData')
  async getAllData() {
    try {
      const allData = await this.mediaService.getDownloadData();
      return allData;
    } catch (error) {
      throw new HttpException(
        'Error getting all media data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
