import { Repository } from 'typeorm';
import { DownloadJobs } from 'src/entity/media.entity';
export declare class MediaViewerService {
    private readonly mediaRepository;
    constructor(mediaRepository: Repository<DownloadJobs>);
    saveMediaData(mediaData: any): Promise<DownloadJobs>;
}
