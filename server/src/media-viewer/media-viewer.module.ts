import { Module } from "@nestjs/common";
import { MediaViewerService } from "./media-viewer.service";
import { MediaViewerController } from "./media-viewer.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DownloadJobs } from "src/entity/media.entity";
import { S3Service } from "src/s3/s3.Service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "",
      database: "postgres",
      entities: [DownloadJobs],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      envFilePath: [".env"], // add this line to load environment variables from a file
    }),
    TypeOrmModule.forFeature([DownloadJobs]),
  ],
  providers: [MediaViewerService, S3Service],
  controllers: [MediaViewerController],
})
export class MediaViewerModule {}
