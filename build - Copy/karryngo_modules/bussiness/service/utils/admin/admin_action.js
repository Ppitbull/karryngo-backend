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
exports.AdminAction = void 0;
const usermanager_service_1 = require("./../../../../services/usermanager/usermanager.service");
const constants_1 = __importDefault(require("../../../../../config-files/constants"));
const decorator_1 = require("../../../../../karryngo_core/decorator");
const EntityID_1 = require("../../../../../karryngo_core/utils/EntityID");
const account_type_enum_1 = require("../../../../services/usermanager/entities/account-type.enum");
let AdminAction = class AdminAction {
    constructor(userManagerService) {
        this.userManagerService = userManagerService;
    }
    acceptAsProvider(request, response) {
        let accountType = "";
        let id = new EntityID_1.EntityID();
        id.setId(request.decoded.id);
        this.userManagerService.findUserById(id)
            .then((data) => {
            accountType = data.result[0].accountType;
            if (accountType == account_type_enum_1.AccountType.MANAGER_ACCOUNT ||
                accountType == account_type_enum_1.AccountType.SUPER_ADMIN_ACCOUNT ||
                accountType == account_type_enum_1.AccountType.CUSTOMER_ACCOUNT) {
                let email = request.body.email;
                this.userManagerService.findUserByEmail(email)
                    .then(() => {
                    return this.db.updateInCollection(constants_1.default.collections.user, { "address.email": email }, {
                        $set: { "isProvider": true, "isAcceptedProvider": true }
                    });
                })
                    .then((result) => {
                    response.status(200).json({
                        resultCode: result.resultCode,
                        message: "The user was updated successfully by you."
                    });
                })
                    .catch((error) => {
                    response.status(500).json({
                        resultCode: error.resultCode,
                        message: "Une erreur est survenue"
                    });
                });
            }
            else
                return response.status(401).json({
                    resultCode: -1,
                    message: "Vous ne pouvez pas effectuer cette operation"
                });
        }).catch((error) => {
            return response.status(404).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    removeAsProvider(request, response) {
        let accountType = "";
        let id = new EntityID_1.EntityID();
        id.setId(request.decoded.id);
        this.userManagerService.findUserById(id)
            .then((data) => {
            accountType = data.result[0].accountType;
            if (accountType == "Admin") {
                let email = request.body.email;
                this.userManagerService.findUserByEmail(email)
                    .then(() => {
                    return this.db.updateInCollection(constants_1.default.collections.user, { "address.email": email }, {
                        $set: { "isProvider": false, "isAcceptedProvider": false }
                    });
                })
                    .then((result) => {
                    response.status(200).json({
                        resultCode: result.resultCode,
                        message: "The user was successfully updated"
                    });
                })
                    .catch((error) => {
                    response.status(500).json({
                        resultCode: error.resultCode,
                        message: "Une erreur est survenue"
                    });
                });
            }
            else
                return response.status(401).json({
                    resultCode: -1,
                    message: "Vous ne pouvez pas effectuer cette operation"
                });
        }).catch((error) => {
            return response.status(404).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], AdminAction.prototype, "db", void 0);
AdminAction = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], AdminAction);
exports.AdminAction = AdminAction;
