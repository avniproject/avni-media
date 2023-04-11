import { MediaViewerService } from "./media-viewer.service";
import { S3Service } from "src/s3/s3.Service";
export declare class MediaViewerController {
    private readonly mediaservice;
    private readonly s3Service;
    constructor(mediaservice: MediaViewerService, s3Service: S3Service);
    postMedia(body: any): Promise<any>;
}
