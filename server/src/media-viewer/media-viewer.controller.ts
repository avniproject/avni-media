import { Body, Controller, Get, Post } from '@nestjs/common';
import { MediaViewerService } from './media-viewer.service';
import { S3Service } from 'src/s3/s3.Service';
// import { Queue } from "bull";
// import { InjectQueue } from "@nestjs/bull";

@Controller('media-viewer')
export class MediaViewerController {
  constructor(
    private readonly mediaservice: MediaViewerService,
    private readonly s3Service: S3Service, // @InjectQueue("downloadMedia") private readonly donwloadMediaQueue: Queue
  ) {}

  @Post('/requestDownload')
  async postMedia(@Body() body: any) {
    // console.log("BODY-->", body);
    // console.log("BODY.username-->", body.username);
    // const presignedURL = await this.s3Service.generatePresignedUrl(
    //   "goonj/IMG_0022.JPG"
    // );
    // console.log("should return presigned URL", presignedURL);

    // const path = "/tmp/server.zip";
    // const key = "upload_test1.zip";
    // const uploadFileToS3 = await this.s3Service.uploadFileToS3(path, key);
    // console.log("Upload file to S3", uploadFileToS3);
    const savedMedia = await this.mediaservice.saveMediaData(body);
    // const result = await this.donwloadMediaQueue.add("downloadJob", {
    //   file: "sample.jpg",
    // });

    // console.log("reslut of queue::::", result);

    return body.data;
  }

  @Get('/download')
  async getData() {
    const result = await this.mediaservice.getMediaData();
    return result;
  }

  @Get('/allData')
  async getAllData() {
    const allData = await this.mediaservice.getDownloadData();
    return allData;
  }
}
