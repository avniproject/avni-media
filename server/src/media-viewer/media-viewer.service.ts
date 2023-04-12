import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DownloadJobs } from "src/entity/media.entity";
import { Status } from "src/media-viewer/status.enum";
import axios from "axios";
import CircularJSON from "circular-json";
import JSZip from "jszip";

@Injectable()
export class MediaViewerService {
  constructor(
    @InjectRepository(DownloadJobs)
    private readonly mediaRepository: Repository<DownloadJobs>
  ) {}
  async getMediaData(): Promise<DownloadJobs[]> {
    const data = await this.mediaRepository.find({
      where: { status: "Pending" as Status },
    });
    const jsonData = JSON.stringify(data);
    const parsedData = CircularJSON.parse(jsonData);
    const zip = new JSZip();

    for (let i = 0; i < parsedData.length; i++) {
      const imageUrl = parsedData[i].image_metadata[i].url;
      try {
        const response = await axios.get(imageUrl, {
          responseType: "arraybuffer",
        });
        if (response.status === 200) {
          const filename = `image${[i]}.jpg`;
          zip.file(filename, response.data, { binary: true });
          return response.data;
        }
      } catch (error) {
        console.error(`Error downloading image from ${imageUrl}: ${error}`);
      }
    }

    const content = await zip.generateAsync({ type: "nodebuffer" });

    const s3 = new AWS.S3();
    const params = {
      Bucket: "bucket-name",
      Key: "zip-file-name.zip",
      Body: content,
    };
    try {
      await s3.upload(params).promise();
    } catch (error) {
      console.error(`Error uploading zip file to S3: ${error}`);
    }
  }

  async saveMediaData(mediaData: any): Promise<DownloadJobs> {
    const media = new DownloadJobs();
    media.username = mediaData.username;
    media.image_metadata = mediaData.data;
    media.zip_url = "https://s3.amazonaws.com/bucket-name/zip-file-name.zip";
    return await this.mediaRepository.save(media);
  }
}
