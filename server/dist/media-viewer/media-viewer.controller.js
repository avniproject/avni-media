"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaViewerController = void 0;
const common_1 = require("@nestjs/common");
const media_viewer_service_1 = require("./media-viewer.service");
const s3_Service_1 = require("../s3/s3.Service");
let MediaViewerController = class MediaViewerController {
    constructor(mediaservice, s3Service) {
        this.mediaservice = mediaservice;
        this.s3Service = s3Service;
    }
    async postMedia(body) {
        console.log(body);
        const presignedURL = await this.s3Service.generatePresignedUrl("goonj/IMG_0022.JPG");
        console.log("should return presigned URL", presignedURL);
        const savedMedia = await this.mediaservice.saveMediaData(body);
        return body.data;
    }
};
__decorate([
    (0, common_1.Post)("/media"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MediaViewerController.prototype, "postMedia", null);
MediaViewerController = __decorate([
    (0, common_1.Controller)("media-viewer"),
    __metadata("design:paramtypes", [media_viewer_service_1.MediaViewerService,
        s3_Service_1.S3Service])
], MediaViewerController);
exports.MediaViewerController = MediaViewerController;
//# sourceMappingURL=media-viewer.controller.js.map