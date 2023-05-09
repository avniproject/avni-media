import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
import { Status } from 'src/media-viewer/status.enum';
import { FileUtility } from 'src/fileUtility/file-size';
import axios from 'axios';
import * as JSZip from 'jszip';
import { S3Service } from 'src/s3/s3.Service';
import * as fs from 'fs';
import * as fsrm from 'fs-extra';
@Injectable()
export class MediaViewerService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly fileUtility: FileUtility,
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
            folderName = await this.fileUtility.folderStructure(
              metadata,
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

        const fileSizeLabel = this.fileUtility.getFileSizeText(fileSizeInBytes);
        console.log("fileSize",fileSizeLabel)
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
}
