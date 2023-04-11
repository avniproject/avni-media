import { DateTime } from "aws-sdk/clients/devicefarm";
declare enum Status {
    Complete = "complete",
    Pending = "pending"
}
export declare class DownloadJobs {
    id: number;
    username: string;
    created_date_time: DateTime;
    last_modified_date_time: DateTime;
    image_metadata: Record<string, any>;
    zip_url: string;
    status: Status;
}
export {};
