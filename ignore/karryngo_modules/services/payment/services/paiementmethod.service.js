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
exports.PaiementMethodService = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const usermanager_service_1 = require("../../usermanager/usermanager.service");
let PaiementMethodService = class PaiementMethodService {
    constructor(userServiceManager) {
        this.userServiceManager = userServiceManager;
    }
    addMethodPaiement(userID, paiementMethod) {
        return this.db.updateInCollection(constants_1.default.collections.user, { "_id": userID.toString() }, {
            $push: { "paimentMethodList": paiementMethod.toString() }
        });
    }
    removeMethodPaiement(userID, paiementMethod) {
        return this.db.removeToCollection(constants_1.default.collections.user, {
            "_id": userID.toString(),
        }, {
            "paimentMethodList._id": paiementMethod.id.toString()
        });
    }
    exitMethodePaiement(userID, paiementMethodID) {
        return new Promise((resolve, reject) => {
            this.userServiceManager.findUserById(userID)
                .then((result) => {
                let user = result.result;
                let m = user.paimentMethodList.find((method) => method.id.toString() == paiementMethodID.toString());
                if (m) {
                    result.result = true;
                    return resolve(result);
                }
                result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                result.result = false;
                reject(result);
            })
                .catch((error) => reject(error));
        });
    }
    getMethodPaiementMethod(userID, paiementMethodType) {
        return new Promise((resolve, reject) => {
            this.userServiceManager.findUserById(userID)
                .then((result) => {
                let user = result.result;
                result.result = user.paimentMethodList.map((method) => method.type == paiementMethodType);
                return resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    getAllPaiementMethod(userID) {
        return new Promise((resolve, reject) => {
            this.userServiceManager.findUserById(userID)
                .then((result) => {
                let user = result.result[0];
                result.result = user.paimentMethodList;
                return resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], PaiementMethodService.prototype, "db", void 0);
PaiementMethodService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], PaiementMethodService);
exports.PaiementMethodService = PaiementMethodService;
