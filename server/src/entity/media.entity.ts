import { DateTime } from "aws-sdk/clients/devicefarm";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "src/media-viewer/status.enum";

// enum Status {
//   Complete = "complete",
//   Pending = "pending",
// }
@Entity()
export class DownloadJobs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_date_time: DateTime;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  last_modified_date_time: DateTime;

  @Column("jsonb")
  image_metadata: Record<string, any>;

  @Column()
  zip_url: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.Pending,
  })
  status: Status;
}
