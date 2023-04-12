import { Body, Controller, Post } from "@nestjs/common";
import { MediaViewerService } from "./media-viewer.service";
import { S3Service } from "src/s3/s3.Service";

@Controller("media-viewer")
export class MediaViewerController {
  constructor(
    private readonly mediaservice: MediaViewerService,
    private readonly s3Service: S3Service
  ) {}

  @Post("/media")
  async postMedia(@Body() body: any) {
    console.log(body);
    const presignedURL = await this.s3Service.generatePresignedUrl(
      "goonj/IMG_0022.JPG"
    );
    console.log("should return presigned URL", presignedURL);

    const path = "/tmp/server.zip";
    const key = "upload_test1.zip";
    const uploadFileToS3 = await this.s3Service.uploadFileToS3(path, key);
    console.log("Upload file to S3", uploadFileToS3);
    const savedMedia = await this.mediaservice.saveMediaData(body);
    return body.data;
  }
}
