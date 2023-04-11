import { Body, Controller, Post } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';

@Controller('media-viewer')
export class MediaViewerController {
  constructor(
       private readonly mediaservice: MediaViewerService,
      
    ) {}
  @Post('/media')
  async postMedia(@Body() body: any) {
    console.log(body)
     const savedMedia = await this.mediaservice.saveMediaData(body);
    return body.data;
  }
}
