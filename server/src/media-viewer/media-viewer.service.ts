import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { Status } from 'src/media-viewer/status.enum';
import axios from 'axios';
// import CircularJSON from "circular-json";
import * as JSZip from 'jszip';
import { S3Service } from 'src/s3/s3.Service';
import * as fs from 'fs';
// import path from "path";
import * as path from 'path';

@Injectable()
export class MediaViewerService {
  constructor(
    private readonly s3Service: S3Service,
    @InjectRepository(DownloadJobs)
    private readonly mediaRepository: Repository<DownloadJobs>,
    private readonly configService: ConfigService,
  ) {}

  async getMediaData(): Promise<DownloadJobs[]> {
    const data = await this.mediaRepository.find({
      where: { status: 'Pending' as Status },
    });
    const jsonData = JSON.stringify(data);
    const parsedData = JSON.parse(jsonData);
    const zip = new JSZip();

    for (const id in parsedData) {
      // console.log("parsedData[i]--", parsedData[id]);
      let imageCount = 0;
      for (let i = 0; i < parsedData[id].image_metadata.length; i++) {
        const imageUrl = parsedData[id].image_metadata[i].url;
        console.log('imageUrl--', imageUrl);

        const objectKey1 = path.basename(imageUrl);
        console.log('Image objectKey 1--', objectKey1);

        const splitOn =
          '.com/' + this.configService.get('S3_BUCKET_NAME') + '/';
        console.log('splitOn--', splitOn);

        const parts = imageUrl.split(splitOn);
        const objectKey = parts[1];

        console.log('Image objectKey--', objectKey);

        console.log('Before presigned url', objectKey);
        const presignedURL = await this.s3Service.generatePresignedUrl(
          objectKey,
        );

        console.log('After presigned url--', presignedURL);

        try {
          imageCount = imageCount + 1;
          const response = await axios.get(presignedURL, {
            responseType: 'arraybuffer',
          });

          if (response.status === 200) {
            const filename = `image${[i]}.jpg`;
            zip.file(filename, response.data, { binary: true });
          }
          // imageCount = imageCount + 1;
        } catch (error) {
          console.error(`Error downloading image from ${imageUrl}: ${error}`);
        }
      }

      const content = await zip.generateAsync({ type: 'nodebuffer' });
      const timestamp = new Date().getTime();
      const filename = `${parsedData[id].username}${timestamp}.zip`;

      console.log('__dirname, filename', __dirname + '/' + filename);
      const filePath = __dirname + filename;
      fs.writeFileSync(filePath, content);
      const stats = fs.statSync(filePath);
      const fileSizeInBytes = stats.size;

      const fileSizeInKB = fileSizeInBytes / 1024;
      const fileSizeInMB = fileSizeInKB / 1024;
      const fileSizeInGB = fileSizeInMB / 1024;

      let size: string | number;
      let unit: string;

      if (fileSizeInBytes < 1024) {
        size = fileSizeInBytes;
        unit = 'bytes';
      } else if (fileSizeInKB < 1024) {
        size = fileSizeInKB.toFixed(2);
        unit = 'KB';
      } else if (fileSizeInMB < 1024) {
        size = fileSizeInMB.toFixed(2);
        unit = 'MB';
      } else {
        size = fileSizeInGB.toFixed(2);
        unit = 'GB';
      }

      console.log(`Size of ${filename}:`);
      console.log(`- ${size} ${unit}`);

      const zipFileS3url = await this.s3Service.uploadFileToS3(
        filePath,
        filename,
      );
      const record = parsedData[id];
      const updatedRecord = {
        ...record,
        status: 'Complete',
        zip_url: zipFileS3url,
        file_size: `${size} ${unit}`,
        image_count: imageCount,
      };
      await this.mediaRepository.update(record.id, updatedRecord);
    }
    return null;
  }

  async saveMediaData(mediaData: any): Promise<DownloadJobs> {
    const media = new DownloadJobs();
    media.username = mediaData.username;
    media.image_metadata = mediaData.data;
    // media.zip_url = "https://s3.amazonaws.com/bucket-name/zip-file-name.zip";
    return await this.mediaRepository.save(media);
  }

  async getDownloadData(): Promise<DownloadJobs[]> {
    const allData = await this.mediaRepository.find();
    const jsonData = JSON.stringify(allData);
    const parsedData = JSON.parse(jsonData);
    for (const id in parsedData) {
      const zipUrl = parsedData[id].zip_url;
      if (zipUrl) {
        const parts = zipUrl.split('.com/');
        const objectKey = parts[1];

        console.log('objectKey--', objectKey);

        const zipPresignedUrl = await this.s3Service.generatePresignedUrl(
          objectKey,
        );
        console.log('s3 url', parsedData[id].zip_url);
        console.log('zipPresignedUrl', zipPresignedUrl);
        parsedData[id].zip_url = zipPresignedUrl;
      }
    }
    return parsedData;
  }
}
