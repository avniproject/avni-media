"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaViewerModule = void 0;
const common_1 = require("@nestjs/common");
const media_viewer_service_1 = require("./media-viewer.service");
const media_viewer_controller_1 = require("./media-viewer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const media_entity_1 = require("../entity/media.entity");
const s3_Service_1 = require("../s3/s3.Service");
const config_1 = require("@nestjs/config");
let MediaViewerModule = class MediaViewerModule {
};
MediaViewerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "",
                database: "postgres",
                entities: [media_entity_1.DownloadJobs],
                synchronize: true,
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: [".env"],
            }),
            typeorm_1.TypeOrmModule.forFeature([media_entity_1.DownloadJobs]),
        ],
        providers: [media_viewer_service_1.MediaViewerService, s3_Service_1.S3Service],
        controllers: [media_viewer_controller_1.MediaViewerController],
    })
], MediaViewerModule);
exports.MediaViewerModule = MediaViewerModule;
//# sourceMappingURL=media-viewer.module.js.map