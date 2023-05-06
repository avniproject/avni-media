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
import * as fsrm from 'fs-extra';
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
    let folderName = '';
    await Promise.all(
      Object.keys(parsedData).map(async (id) => {
        const locationHierarchy = parsedData[id].location_level 
        let imageCount = 0;
        await Promise.all(
          parsedData[id].image_metadata.map(async (metadata: { url: any; address: any; conceptName: any; subjectTypeName: any; encounterTypeName: any; }, i: any) => {
            const imageUrl = metadata.url;
            const address = metadata.address;
            const conceptType = metadata.conceptName;
            const subjectType = metadata.subjectTypeName;
            const encounterType = metadata.encounterTypeName;
            folderName = await this.folderStructure(
              address,
              subjectType,
              encounterType,
              conceptType,
              locationHierarchy
            );
            try {
              const splitOn =
                '.com/' +
                this.configService.get('AVNI_MEDIA_S3_BUCKET_NAME') +
                '/';

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
                zip
                  .folder(folderName)
                  .file(filename, response.data, { binary: true });
              }
              imageCount = imageCount + 1;
            } catch (error) {
              console.error(
                `Error downloading image from ${imageUrl}: ${error}`,
              );
            }
          }),
        );

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
        try {
          const folderSName = folderName.split('/');
          const rmFolder = folderSName[0];
          await fsrm.remove(rmFolder);
          console.log(`Directory ${rmFolder} was deleted successfully.`);
        } catch (err) {
          console.error(`Error deleting directory ${folderName}: ${err}`);
        }
      }),
    );

    return;
  }

  async saveMediaData(mediaData: any): Promise<DownloadJobs> {
    const { username, data, description, addressLevel} = mediaData;
    
    if (!username || typeof username !== 'string' || !data) {
      throw new Error('Invalid media data');
    }

    try {
      const media = new DownloadJobs();
      media.username = username;
      media.image_metadata = data;
      media.image_description = description;
      media.location_level = addressLevel
      const savedMedia = await this.mediaRepository.save(media);

      return savedMedia;
    } catch (error) {
      console.error('Error while saving media data:', error);
      throw new Error('Failed to save media data');
    }
  }

  async getDownloadData(username: string): Promise<DownloadJobs[]> {
    const allData = await this.mediaRepository.find({where:{username: username}});

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

  async folderStructure(
    address: string,
    subjectType: any,
    encounterType: any,
    conceptType: any,
    locationHierarchy: { name: any; }[]
  ): Promise<string> {
    const keys = locationHierarchy.map((index: { name: any; }) => index.name);
    const jsonadd = JSON.parse(address);
    const addressArray = [];
    let val =''
    for (const key of keys) {
      val= key.toString()
      addressArray.push(jsonadd[val]);
    }
    let directoryPath = ''
    await Promise.all(
      addressArray.map(async (addressPart) => {
        if (addressPart) {
          if (directoryPath) {
            directoryPath = `${directoryPath}/${addressPart}`;
          } else {
            directoryPath = `${addressPart}`;
          }
          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
          }
        }
      }),
    );

    if (subjectType) {
      if (directoryPath) {
        directoryPath = `${directoryPath}/${subjectType}`;
      } else {
        directoryPath = `${subjectType}`;
      }
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }
    }

    if (encounterType) {
      if (directoryPath) {
        directoryPath = `${directoryPath}/${encounterType}`;
      } else {
        directoryPath = `${encounterType}`;
      }
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }
    }

    if (conceptType) {
      if (directoryPath) {
        directoryPath = `${directoryPath}/${conceptType}`;
      } else {
        directoryPath = `${conceptType}`;
      }
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }
    }

    return directoryPath;
  }
}
