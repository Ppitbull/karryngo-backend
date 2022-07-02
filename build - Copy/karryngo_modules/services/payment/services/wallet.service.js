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
exports.WalletService = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const usermanager_service_1 = require("../../usermanager/usermanager.service");
const wallet_1 = require("../entities/wallet");
let WalletService = class WalletService {
    constructor(userService) {
        this.userService = userService;
    }
    increaseWallet(userID, amount) {
        return new Promise((resolve, reject) => {
            if (amount <= 0) {
                let result = new ActionResult_1.ActionResult();
                result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                return reject(result);
            }
            this.getWallet(userID)
                .then((result) => {
                var wallet = new wallet_1.Wallet(result.result);
                wallet.increase(amount);
                console.log("walletwalletwallet: ", wallet);
                return this.updateWallet(wallet);
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    decreaseWallet(userID, amount) {
        return new Promise((resolve, reject) => {
            this.getWallet(userID)
                .then((result) => {
                let wallet = result.result;
                if (!wallet.decrease(amount)) {
                    result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                    return Promise.reject(result);
                }
                return this.updateWallet(wallet);
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    getWallet(userID) {
        return new Promise((resolve, reject) => {
            this.userService.findUserById(userID)
                .then((result) => {
                if (result.result.length == 0) {
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result = null;
                    return reject(result);
                }
                let user = result.result[0];
                result.result = user.wallet;
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    updateWallet(wallet) {
        return this.db.updateInCollection(constants_1.default.collections.user, {
            "wallet._id": wallet.id
        }, {
            $set: {
                "wallet.amount": wallet.amount
            }
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], WalletService.prototype, "db", void 0);
WalletService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], WalletService);
exports.WalletService = WalletService;
