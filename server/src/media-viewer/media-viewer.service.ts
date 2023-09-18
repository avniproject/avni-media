import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { Status } from 'src/media-viewer/status.enum';
import { FileUtility } from 'src/utils/file-utility';
import axios from 'axios';
import * as JSZip from 'jszip';
import { S3Service } from 'src/s3/s3.Service';
import * as fs from 'fs';
import * as fsrm from 'fs-extra';
@Injectable()
export class MediaViewerService {
  private readonly logger = new Logger(MediaViewerService.name);

  constructor(
    private readonly s3Service: S3Service,
    private readonly fileUtility: FileUtility,
    @InjectRepository(DownloadJobs)
    private readonly mediaRepository: Repository<DownloadJobs>,
    private readonly configService: ConfigService,
  ) {}

  async createZipOfMediaFiles(): Promise<DownloadJobs[]> {
    const data = await this.mediaRepository.find({
      where: { status: 'Pending' as Status },
    });

    const jsonData = JSON.stringify(data);

    const parsedData = JSON.parse(jsonData);

    const zip = new JSZip();

    let folderName = '';

    await Promise.all(
      Object.keys(parsedData).map(async (id) => {
        const locationHierarchy = parsedData[id].location_level;
        let imageCount = 0;
        await Promise.all(
          parsedData[id].image_metadata.map(
            async (
              metadata: {
                url: any;
                address: any;
                conceptName: any;
                subjectTypeName: any;
                encounterTypeName: any;
              },
              i: any,
            ) => {
              const imageUrl = metadata.url;
              folderName = await this.fileUtility.folderStructure(
                metadata,
                locationHierarchy,
              );
              try {
                const splitOn =
                  '.com/' +
                  this.configService.get('AVNI_MEDIA_S3_BUCKET_NAME') +
                  '/';

                const parts = imageUrl.split(splitOn);
                const objectKey = parts[1];
                this.logger.log('Creating presigned url for: ', objectKey);
                const presignedURL = await this.s3Service.generatePresignedUrl(
                  objectKey,
                );

                const response = await axios.get(presignedURL, {
                  responseType: 'arraybuffer',
                });

                if (response.status === 200) {
                  const fileName = `image${[i]}.jpg`;
                  this.logger.log(
                    'Creating zip file for folder name: ',
                    folderName,
                    ' and file name: ',
                    fileName,
                  );
                  zip
                    .folder(folderName)
                    .file(fileName, response.data, { binary: true });
                }
                imageCount = imageCount + 1;
              } catch (error) {
                this.logger.error(
                  `Error downloading image from ${imageUrl}: ${error}`,
                );
              }
            },
          ),
        );

        const content = await zip.generateAsync({ type: 'nodebuffer' });
        const timestamp = new Date().getTime();
        const zipFileName = `${parsedData[id].id}${timestamp}.zip`;
        const filePath = __dirname + zipFileName;
        fs.writeFileSync(filePath, content);
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;

        const fileSizeLabel = this.fileUtility.getFileSizeText(fileSizeInBytes);
        const s3FileName = 'media-zipped-files/' + zipFileName;

        this.logger.log(
          `Uploading the zip file ${s3FileName} to S3 at ${filePath} `,
        );
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
        this.logger.log('Updating the zip URL and job status');
        await this.mediaRepository.update(record.id, updatedRecord);

        fs.unlinkSync(filePath);
        try {
          const folderSName = folderName.split('/');
          const rmFolder = folderSName[0];
          await fsrm.remove(rmFolder);
          this.logger.log(`Temp directory ${rmFolder} cleaned successfully.`);
        } catch (err) {
          this.logger.error(`Error deleting directory ${folderName}: ${err}`);
        }
      }),
    );

    return;
  }

  async saveDownloadRequestMetadata(mediaData: any): Promise<DownloadJobs> {
    const { username, data, description, addressLevelTypes } = mediaData;

    if (!username || typeof username !== 'string' || !data) {
      this.logger.error(`Received invalid download request data`);
      throw new Error('Invalid media data');
    }

    try {
      const media = new DownloadJobs();
      media.username = username;
      media.image_metadata = data;
      media.image_description = description;
      media.location_level = addressLevelTypes;
      this.logger.log('Saving the download request metadata');
      const savedMedia = await this.mediaRepository.save(media);

      return savedMedia;
    } catch (error) {
      this.logger.error('Error while saving media data:', error);
      throw new Error('Failed to save media data');
    }
  }

  async getAvailableDownloadsList(username: string): Promise<DownloadJobs[]> {
    this.logger.log(`Finding the available download for the user ${username}`);
    const allData = await this.mediaRepository.find({
      where: { username: username },
    });

    this.logger.log(`Creating presigned URL for all the zip files.`);
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

    this.logger.log(`Preparing the return data for listing.`);
    const parsedData = allData.map((item, index) => {
      if (item.zip_url) {
        return { ...item, zip_url: presignedUrls[index] };
      }
      return item;
    });
    return parsedData;
  }
}
