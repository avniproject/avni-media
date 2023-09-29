import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { Status } from 'src/media-viewer/status.enum';
import { FileUtility } from 'src/utils/file-utility';
import axios from 'axios';
import { S3Service } from 'src/s3/s3.Service';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import { zip } from 'zip-a-folder';

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

  async createZipOfMediaFiles(): Promise<{ job: number }[]> {
    const data = await this.mediaRepository.find({
      where: { status: 'Pending' as Status },
    });

    const jsonData = JSON.stringify(data);

    const parsedData = JSON.parse(jsonData);

    let downloadRootFolder = '';

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
              const folderName = await this.fileUtility.folderStructure(
                metadata,
                locationHierarchy,
              );
              downloadRootFolder = this.getRootFolder(folderName);
              imageCount += await this.downloadMediaItemToFilesystem(
                metadata,
                i,
                folderName,
              );
            },
          ),
        );
        this.logger.log(
          `Completed media downloads for job ${parsedData[id].id}`,
        );

        const { zipFileName, localZipfilePath, fileSizeInBytes } =
          await this.createZip(parsedData[id].id, downloadRootFolder);

        const fileSizeLabel = this.fileUtility.getFileSizeText(fileSizeInBytes);
        const s3FileName = 'media-zipped-files/' + zipFileName;

        this.logger.log(
          `Uploading the zip file ${s3FileName} to S3 at ${localZipfilePath} `,
        );
        const zipFileS3url = await this.s3Service.uploadFileToS3(
          localZipfilePath,
          s3FileName,
        );

        await this.updateDBRecord(
          parsedData,
          id,
          zipFileS3url,
          fileSizeLabel,
          imageCount,
        );
        await this.cleanup(localZipfilePath, downloadRootFolder);
      }),
    );

    return data.map((d) => ({ job: d.id }));
  }

  private async downloadMediaItemToFilesystem(
    metadata: {
      url: any;
      address: any;
      conceptName: any;
      subjectTypeName: any;
      encounterTypeName: any;
    },
    i: any,
    folderName: string,
  ) {
    let imageCount = 0;
    const imageUrl = metadata.url;

    try {
      const splitOn =
        '.com/' + this.configService.get('AVNI_MEDIA_S3_BUCKET_NAME') + '/';

      const parts = imageUrl.split(splitOn);
      this.logger.debug(`Image url ${imageUrl} , parts ${parts}`);
      const objectKey = parts[1];
      if (objectKey) {
        this.logger.debug('Creating pre-signed url for: ', objectKey);
        const presignedURL = await this.s3Service.generatePresignedUrl(
          objectKey,
        );

        const response = await axios.get(presignedURL, {
          responseType: 'arraybuffer',
        });

        if (response.status === 200) {
          const fileName = `image${[i]}.jpg`;
          this.logger.debug(
            `Writing local file: ${folderName}/${fileName} for ${objectKey}`,
          );
          fs.writeFileSync(
            `${folderName}/${fileName}`,
            response.data,
            'binary',
          );
        }
        imageCount = 1;
      }
    } catch (error) {
      this.logger.error(`Error downloading image from ${imageUrl}: ${error}`);
    }
    return imageCount;
  }

  private async cleanup(localZipFilePath: string, downloadRootFolder: string) {
    fs.unlinkSync(localZipFilePath);
    try {
      const rmFolder = this.getRootFolder(downloadRootFolder);
      await fsExtra.removeSync(rmFolder);
      this.logger.log(`Temp directory ${rmFolder} cleaned successfully.`);
    } catch (err) {
      this.logger.error(
        `Error deleting directory ${downloadRootFolder}: ${err}`,
      );
    }
  }

  private async updateDBRecord(
    parsedData,
    id: string,
    zipFileS3url: string,
    fileSizeLabel: string,
    imageCount: number,
  ) {
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
  }

  private async createZip(id: string, folderName: string) {
    const timestamp = new Date().getTime();
    const zipFileName = `${id}${timestamp}.zip`;
    const filePath = __dirname + zipFileName;
    const fsZipOutputStream = fs.createWriteStream(filePath);
    await zip(folderName, undefined, { customWriteStream: fsZipOutputStream });
    const stats = fs.statSync(filePath);
    const fileSizeInBytes = stats.size;
    return { zipFileName, localZipfilePath: filePath, fileSizeInBytes };
  }

  private getRootFolder(folderName: string) {
    const folderSName = folderName.split('/');
    return folderSName[0];
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
