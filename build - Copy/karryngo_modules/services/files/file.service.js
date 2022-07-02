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
exports.FileService = void 0;
const KFile_1 = require("../../../karryngo_core/fs/KFile");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const FileSystemException_1 = require("../../../karryngo_core/exception/FileSystemException");
const decorator_1 = require("../../../karryngo_core/decorator");
let FileService = class FileService {
    uploadAll(docs) {
        return new Promise((resolve, reject) => {
            let links = [];
            console.log("Docs ", docs);
            docs.forEach((file) => {
                let f = new KFile_1.KFile(new EntityID_1.EntityID());
                f.hydrate(file);
                links.push({ link: `/files/${f._id.toString()}` });
                return f;
            });
            Promise.all(docs.map((f) => this.uploadOnce(f))) //files.map((file:KFile)=> this.fs.put(file))
                .then((result) => {
                let r = new ActionResult_1.ActionResult();
                r.result = links;
                resolve(r);
            })
                .catch((error) => reject(error));
        });
    }
    uploadOnce(doc) {
        return new Promise((resolve, reject) => {
            let file = new KFile_1.KFile(new EntityID_1.EntityID());
            file.hydrate(doc);
            let link = { link: `/files/${file._id.toString()}` };
            this.fs.put(file)
                .then((result) => {
                let r = new ActionResult_1.ActionResult();
                r.result = link;
                resolve(r);
            })
                .catch((e) => {
                let error = new ActionResult_1.ActionResult();
                error.resultCode = FileSystemException_1.FileSystemException.UNABLE_TO_IMPORT_ERROR;
                error.description = error.message;
                error.message = `Unable to import filename ${file.name}`;
                reject(error);
            });
        });
    }
};
__decorate([
    (0, decorator_1.KFileStorage)(),
    __metadata("design:type", Object)
], FileService.prototype, "fs", void 0);
FileService = __decorate([
    (0, decorator_1.Service)()
], FileService);
exports.FileService = FileService;
