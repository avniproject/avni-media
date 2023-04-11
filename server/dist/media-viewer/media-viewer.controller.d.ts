import { MediaViewerService } from './media-viewer.service';
export declare class MediaViewerController {
    private readonly mediaservice;
    constructor(mediaservice: MediaViewerService);
    postMedia(body: any): Promise<any>;
}
