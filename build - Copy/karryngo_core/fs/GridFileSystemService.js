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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridFileSystemService = void 0;
const ActionResult_1 = require("../utils/ActionResult");
const mongodb_1 = require("mongodb");
const MongoDBManager_1 = require("../persistence/MongoDBManager");
const constants_1 = __importDefault(require("../../config-files/constants"));
const decorator_1 = require("../decorator");
const configuration_decorator_1 = require("./../decorator/configuration.decorator");
let GridFileSystemService = class GridFileSystemService {
    constructor() {
        this.gridFS = null;
        MongoDBManager_1.MongoDBManager.connect(this.configService.getValueOf('persistence')[constants_1.default.env_mode].database_file).then((data) => {
            this.gridFS = new mongodb_1.GridFSBucket(data.result);
        });
    }
    put(file) {
        let result = new ActionResult_1.ActionResult();
        return new Promise((resolve, reject) => {
            if (this.gridFS == null) {
                result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                result.message = "Cannot connect to bd file";
                return reject(result);
            }
            this.gridFS.openUploadStreamWithId(file._id.toString(), file.name, {
                contentType: file.type,
                metadata: {
                    size: file.size,
                    lastModified: file.lastModified
                }
            }).end(file.data, file.encoding, () => {
                return resolve(result);
            });
        });
    }
    get(name) {
        let result = new ActionResult_1.ActionResult();
        return new Promise((resolve, reject) => {
            let stream = this.gridFS.openDownloadStreamByName(name.toString());
            stream.addListener('data', (file) => {
                result.result = file;
                resolve(result);
            });
            stream.addListener('error', (error) => {
                result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                result.message = "Error occur when retreiving file data";
                result.result = error;
                reject(result);
            });
        });
    }
    exist(name) {
        throw new Error("Method not implemented.");
    }
};
__decorate([
    (0, configuration_decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], GridFileSystemService.prototype, "configService", void 0);
GridFileSystemService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [])
], GridFileSystemService);
exports.GridFileSystemService = GridFileSystemService;
