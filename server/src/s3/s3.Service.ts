import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { S3 } from "aws-sdk";

@Injectable()
export class S3Service {
  private readonly s3: S3;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      signatureVersion: "v4",
      accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
      region: this.configService.get("AWS_REGION"),
    });
    this.bucketName = this.configService.get("S3_BUCKET_NAME");
  }

  async generatePresignedUrl(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 300, // Link expires in 5 minutes (300 seconds)
    };
    const url = await this.s3.getSignedUrlPromise("getObject", params);
    return url;
  }
}
