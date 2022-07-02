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
exports.ControlBussTest = void 0;
const usermanager_service_1 = require("../../services/usermanager/usermanager.service");
const core_decorator_1 = require("../../../karryngo_core/decorator/core.decorator");
const filestorage_decorator_1 = require("../../../karryngo_core/decorator/filestorage.decorator");
const KFile_1 = require("../../../karryngo_core/fs/KFile");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
let ControlBussTest = class ControlBussTest {
    //,private kfile:KarryngoFileStorage
    constructor(userMaganer) {
        this.userMaganer = userMaganer;
        // console.log("Constructor busstest ",this.userMaganer)
    }
    getAllUser(req, response) {
        this.userMaganer.findAll()
            .then((data) => response.status(200).json(data))
            .catch((error) => response.status(500).json(error));
    }
    testUpload(req, response) {
        // console.log(req.body)
        // console.log(req);
        // let buf:Buffer = Buffer.from(req.body.file,'base64');
        // console.log("Requeste", req)
        let kfile = new KFile_1.KFile(new EntityID_1.EntityID());
        // req.body.options
        // this.fs.put(buf,req.body.options)
        // .then((data:ActionResult)=>{
        //     response.status(200).json({
        //         resultCode:data.resultCode,
        //         message:data.message,
        //         result:data.result
        //     })
        // })
        // .catch((error:ActionResult)=>{
        //     response.status(500).json({
        //         resultCode:error.resultCode,
        //         message:error.message,
        //         result:error.result
        //     })
        // })
    }
    testdownLoad(req, response) {
        // console.log("Test dowload");
        // this.fs.get(req.body.filename)
        // .then((data:ActionResult)=>response.status(200).json(data.toString()))
        // .catch((error:ActionResult)=> response.status(500).json(error.toString()))
    }
};
__decorate([
    (0, filestorage_decorator_1.KFileStorage)(),
    __metadata("design:type", Object)
], ControlBussTest.prototype, "fs", void 0);
ControlBussTest = __decorate([
    (0, core_decorator_1.Controller)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], ControlBussTest);
exports.ControlBussTest = ControlBussTest;
