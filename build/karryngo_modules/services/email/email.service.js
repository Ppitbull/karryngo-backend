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
exports.EmailService = void 0;
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const nodemailer_1 = __importDefault(require("nodemailer"));
const decorator_1 = require("../../../karryngo_core/decorator");
let EmailService = class EmailService {
    send(email) {
        return new Promise((resolve, reject) => {
            let sender = nodemailer_1.default.createTransport({
                service: this.configService.getValueOf('mail').service,
                auth: this.configService.getValueOf('mail').auth
            });
            sender.sendMail(email.toString(), (error, infos) => {
                let result = new ActionResult_1.ActionResult();
                if (error) {
                    result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                    result.result = error;
                    reject(result);
                }
                else
                    resolve(result);
            });
        });
    }
};
__decorate([
    decorator_1.ConfigService(),
    __metadata("design:type", Object)
], EmailService.prototype, "configService", void 0);
EmailService = __decorate([
    decorator_1.Service()
], EmailService);
exports.EmailService = EmailService;
