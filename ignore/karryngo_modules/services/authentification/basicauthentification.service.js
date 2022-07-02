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
exports.BasicAuthentificationService = void 0;
const constants_1 = __importDefault(require("../../../config-files/constants"));
const decorator_1 = require("../../../karryngo_core/decorator");
const apiaccess_1 = require("../../../karryngo_core/security/apiaccess");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const email_service_1 = require("../email/email.service");
const email_1 = require("../email/entities/email");
const User_1 = require("../usermanager/entities/User");
const usermanager_service_1 = require("../usermanager/usermanager.service");
let BasicAuthentificationService = class BasicAuthentificationService {
    constructor(userManagerService, emailService, jwtAuth) {
        this.userManagerService = userManagerService;
        this.emailService = emailService;
        this.jwtAuth = jwtAuth;
    }
    register(user) {
        return new Promise((resolve, reject) => {
            this.userManagerService.findUserByEmail(user.adresse.email)
                .then((data) => this.userManagerService.newUser(user))
                .then((data) => resolve(data))
                .catch((err) => reject(err));
        });
    }
    login(user) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.user, { "address.email": user.adresse.email, "password": user.password })
                .then((data) => {
                let result = new ActionResult_1.ActionResult();
                if (data.result.length == 0) {
                    result.description = "No data found";
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result = null;
                    reject(result);
                }
                else {
                    let p = new User_1.User();
                    p.hydrate(data.result[0]);
                    result.result = p;
                    resolve(result);
                }
            })
                .catch((error) => reject(error));
        });
    }
    forgotPassword(user) {
        return new Promise((resolve, reject) => {
            this.userManagerService.findUserByEmail(user.adresse.email)
                .then((result) => this.jwtAuth.JWTRegister(result.result[0].adresse.email, result.result[0].id.toString()))
                .then((result) => this.emailService.send(new email_1.Email()
                .from(this.configService.getValueOf('mail').auth.user)
                .title("Recuperation de compte")
                .to(user.adresse.email)
                .htmlContent(`
                    <p>Ciquez  sur ce <a href="${this.configService.getValueOf("mail").baseurl}/#/reset-password?token=${result.result}">lien</a> pour modifier votre mot de passe<p> 
                `)))
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    changePassword(user, newPassword) {
        return new Promise((resolve, reject) => {
            this.userManagerService.findUserByEmail(user.adresse.email)
                .then((result) => {
                let user = result.result;
                if (user.password != newPassword) {
                    result.message = "The old password is not correct";
                    result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                    result.result = null;
                    return Promise.reject(result);
                }
                user.password = newPassword;
                return this.resetPassword(user);
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    resetPassword(user) {
        return this.db.updateInCollection(constants_1.default.collections.user, { "adresse.email": user.adresse.email }, {
            $set: { "password": user.password }
        });
    }
    verifyEmail(user) {
        return new Promise((resolve, reject) => {
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], BasicAuthentificationService.prototype, "db", void 0);
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], BasicAuthentificationService.prototype, "configService", void 0);
BasicAuthentificationService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService,
        email_service_1.EmailService,
        apiaccess_1.ApiAccess])
], BasicAuthentificationService);
exports.BasicAuthentificationService = BasicAuthentificationService;
