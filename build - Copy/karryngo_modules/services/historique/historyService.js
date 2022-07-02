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
exports.HistoryService = void 0;
const constants_1 = __importDefault(require("../../../config-files/constants"));
const decorator_1 = require("../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const usermanager_service_1 = require("../usermanager/usermanager.service");
const history_1 = require("./history");
let HistoryService = class HistoryService {
    constructor(userService) {
        this.userService = userService;
    }
    addHistory(user, history) {
        return new Promise((resolve, reject) => {
            this.findHistory(user, history.serviceTransportID)
                .then((result) => {
                if (result.result.length > 0) {
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                    return Promise.reject(result);
                }
                return this.db.updateInCollection(constants_1.default.collections.user, { "_id": user.id.toString() }, {
                    $push: { "histories": history.toString() }
                });
            })
                .then((result) => resolve(result))
                .catch((result) => reject(result));
        });
    }
    updateHistory(user) {
        return new Promise((resolve, reject) => {
        });
    }
    updateTransactionState(user, idService, state) {
        return this.db.updateInCollection(constants_1.default.collections.requestservice, {
            "_id": user._id.toString(),
            "histories.serviceTransportID": idService.toString()
        }, {
            $set: {
                "histories.$.financialTransaction.financialTransaction.state": state.state,
                "histories.$.financialTransaction.financialTransaction.endDate": state.endDate
            }
        });
    }
    updateTransaction(user, idService, toUpdate) {
        return this.db.updateInCollection(constants_1.default.collections.user, {
            "_id": user.id.toString(),
            "histories.serviceTransportID": idService.toString()
        }, {
            $set: {
                "histories.$.financialTransaction": toUpdate,
            }
        });
    }
    findHistory(user, idService) {
        return new Promise((resolve, reject) => {
            this.db.findDepthInCollection(constants_1.default.collections.user, [
                {
                    "$match": {
                        "_id": user.id.toString()
                    }
                },
                {
                    "$unwind": "$histories"
                },
                {
                    "$match": {
                        "histories.serviceTransportID": idService.toString()
                    }
                },
                {
                    "$replaceRoot": {
                        "newRoot": "$histories"
                    }
                }
            ]).then((result) => {
                if (result.result.length == 0) {
                    result.result = [];
                    return resolve(result);
                }
                let history = new history_1.UserHistory(new EntityID_1.EntityID());
                history.hydrate(result.result[0]);
                result.result = [history];
                resolve(result);
            })
                .catch((error) => {
                error.result = null;
                reject(error);
            });
        });
    }
    findHistoryByRefTransaction(userID, ref) {
        return new Promise((resolve, reject) => {
            this.db.findDepthInCollection(constants_1.default.collections.user, [
                {
                    "$match": {
                        "_id": userID.toString()
                    }
                },
                {
                    "$unwind": "$histories"
                },
                {
                    "$match": {
                        "histories.financialTransaction.ref": ref
                    }
                },
                {
                    "$replaceRoot": {
                        "newRoot": "$histories"
                    }
                }
            ]).then((result) => {
                if (result.result.length == 0) {
                    result.result = null;
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    return reject(result);
                }
                let history = new history_1.UserHistory(new EntityID_1.EntityID());
                history.hydrate(result.result[0]);
                result.result = history;
                resolve(result);
            })
                .catch((error) => {
                error.result = null;
                reject(error);
            });
        });
    }
    checkExistHistory(user, idService) {
        return new Promise((resolve, reject) => {
            this.findHistory(user, idService)
                .then((result) => {
                if (result.result.length > 0)
                    return resolve(result);
                reject(result);
            }).catch((result) => reject(result));
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], HistoryService.prototype, "db", void 0);
HistoryService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], HistoryService);
exports.HistoryService = HistoryService;
