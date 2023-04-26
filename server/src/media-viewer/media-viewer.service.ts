import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { Status } from 'src/media-viewer/status.enum';
import axios from 'axios';
import * as JSZip from 'jszip';
import { S3Service } from 'src/s3/s3.Service';
import * as fs from 'fs';

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
      let imageCount = 0;
      for (let i = 0; i < parsedData[id].image_metadata.length; i++) {
        const imageUrl = parsedData[id].image_metadata[i].url;
        try {
          const splitOn =
            '.com/' + this.configService.get('AVNI_MEDIA_S3_BUCKET_NAME') + '/';

          const parts = imageUrl.split(splitOn);
          const objectKey = parts[1];

          const presignedURL = await this.s3Service.generatePresignedUrl(
            objectKey,
          );

          const response = await axios.get(presignedURL, {
            responseType: 'arraybuffer',
          });

          if (response.status === 200) {
            const filename = `image${[i]}.jpg`;
            zip.file(filename, response.data, { binary: true });
          }
          imageCount = imageCount + 1;
        } catch (error) {
          console.error(`Error downloading image from ${imageUrl}: ${error}`);
        }
      }

      const content = await zip.generateAsync({ type: 'nodebuffer' });
      const timestamp = new Date().getTime();
      const filename = `${parsedData[id].id}${timestamp}.zip`;
      const filePath = __dirname + filename;
      fs.writeFileSync(filePath, content);
      const stats = fs.statSync(filePath);
      const fileSizeInBytes = stats.size;

      const fileSizeLabel = this.getFileSizeText(fileSizeInBytes);
      const s3FileName = 'media-zipped-files/' + filename;

      const zipFileS3url = await this.s3Service.uploadFileToS3(
        filePath,
        s3FileName,
      );

      const record = parsedData[id];
      const updatedRecord = {
        ...record,
        status: 'Complete',
        zip_url: zipFileS3url,
        file_size: fileSizeLabel,
        image_count: imageCount,
      };
      await this.mediaRepository.update(record.id, updatedRecord);

      fs.unlinkSync(filePath);
    }
    return;
  }

  async saveMediaData(mediaData: any): Promise<DownloadJobs> {
    const { username, data, description } = mediaData;
   
    if (!username || typeof username !== 'string' || !data) {
      throw new Error('Invalid media data');
    }

    try {
      const media = new DownloadJobs();
      media.username = username;
      media.image_metadata = data;
      media.image_description = description;
      const savedMedia = await this.mediaRepository.save(media);

      return savedMedia;
    } catch (error) {
      console.error('Error while saving media data:', error);
      throw new Error('Failed to save media data');
    }
  }

  async getDownloadData(): Promise<DownloadJobs[]> {
    const allData = await this.mediaRepository.find();
    const presignedUrls = await Promise.all(
      allData.map(async (item) => {
        if (item.zip_url) {
          const parts = item.zip_url.split('.com/');
          const objectKey = parts[1];
          return this.s3Service.generatePresignedUrl(objectKey);
        }
        return null;
      }),
    );

    const parsedData = allData.map((item, index) => {
      if (item.zip_url) {
        return { ...item, zip_url: presignedUrls[index] };
      }
      return item;
    });
    return parsedData;
  }

  getFileSizeText(fileSizeInBytes: number): string {
    const BYTE_TO_KB = 1024;
    const KB_TO_MB = 1024;
    const MB_TO_GB = 1024;

    if (!Number.isFinite(fileSizeInBytes) || fileSizeInBytes < 0) {
      throw new Error('Invalid file size');
    }

    let size: string | number;
    let unit: string;

    if (fileSizeInBytes < BYTE_TO_KB) {
      size = fileSizeInBytes;
      unit = 'bytes';
    } else if (fileSizeInBytes < BYTE_TO_KB * KB_TO_MB) {
      size = (fileSizeInBytes / BYTE_TO_KB).toFixed(2);
      unit = 'KB';
    } else if (fileSizeInBytes < BYTE_TO_KB * KB_TO_MB * MB_TO_GB) {
      size = (fileSizeInBytes / BYTE_TO_KB / KB_TO_MB).toFixed(2);
      unit = 'MB';
    } else {
      size = (fileSizeInBytes / BYTE_TO_KB / KB_TO_MB / MB_TO_GB).toFixed(2);
      unit = 'GB';
    }

    return `${size} ${unit}`;
  }
}
