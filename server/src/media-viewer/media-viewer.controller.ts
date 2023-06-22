import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { S3Service } from 'src/s3/s3.Service';

@Controller('media-viewer')
export class MediaViewerController {
  private readonly logger = new Logger(MediaViewerController.name);
  constructor(
    private readonly mediaService: MediaViewerService,
    private readonly s3Service: S3Service, // @InjectQueue("downloadMedia") private readonly donwloadMediaQueue: Queue
  ) {}

  @Post('/requestDownload')
  async postMedia(@Body() body: any) {
    try {
      await this.mediaService.saveDownloadRequestMetadata(body);
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(
        `ERROR occurred while saving the download request  ${error}`,
      );
      throw new HttpException(
        'Error saving download request',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/download')
  async getData() {
    try {
      await this.mediaService.createZipOfMediaFiles();
      return HttpStatus.OK;
    } catch (error) {
      this.logger.error(
        `ERROR occurred while saving the creating zip of media files  ${error}`,
      );
      throw new HttpException(
        'Error creating zip of media files',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/allData')
  async getAllData(@Query('username') username: string) {
    try {
      const allData = await this.mediaService.getAvailableDownloadsList(
        username,
      );
      return allData;
    } catch (error) {
      this.logger.error(`ERROR occurred while fetching all data  ${error}`);
      throw new HttpException(
        'Error getting all media data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
