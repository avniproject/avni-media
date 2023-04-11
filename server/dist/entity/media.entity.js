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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadJobs = void 0;
const typeorm_1 = require("typeorm");
var Status;
(function (Status) {
    Status["Complete"] = "complete";
    Status["Pending"] = "pending";
})(Status || (Status = {}));
let DownloadJobs = class DownloadJobs {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DownloadJobs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DownloadJobs.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Object)
], DownloadJobs.prototype, "created_date_time", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Object)
], DownloadJobs.prototype, "last_modified_date_time", void 0);
__decorate([
    (0, typeorm_1.Column)("jsonb"),
    __metadata("design:type", Object)
], DownloadJobs.prototype, "image_metadata", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DownloadJobs.prototype, "zip_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: Status,
        default: Status.Pending,
    }),
    __metadata("design:type", String)
], DownloadJobs.prototype, "status", void 0);
DownloadJobs = __decorate([
    (0, typeorm_1.Entity)()
], DownloadJobs);
exports.DownloadJobs = DownloadJobs;
//# sourceMappingURL=media.entity.js.map