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
exports.RateService = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const usermanager_service_1 = require("../../usermanager/usermanager.service");
const rate_1 = require("../entities/rate");
let RateService = class RateService {
    constructor(userService) {
        this.userService = userService;
    }
    addRate(rate) {
        var rate_instance = new rate_1.Rate();
        rate_instance.setAll(rate);
        rate_instance.setID(rate_instance._id);
        // console.log("dd", rate_instance)
        return this.db.addToCollection("Rates", rate_instance);
    }
    changeRate(rateID, rate) {
        return new Promise((resolve, reject) => {
            if (rate.owner <= 0 || rate.provider <= 0 || rate.manager <= 0) {
                let result = new ActionResult_1.ActionResult();
                result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                return reject(result);
            }
            this.getRate(rateID)
                .then((result) => {
                var new_rate = new rate_1.Rate(result.result[0]._id);
                // new_rate.setAll(rate);
                // console.log("rate: ", new_rate)
                // return
                return this.updateRate(result.result[0]._id, rate);
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    getRate(id) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection("Rates", { "_id": id })
                .then((res) => {
                resolve(res);
            });
        });
    }
    getRateByCountry(countryID) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection("Rates", { "countryID": countryID })
                .then((res) => {
                console.log("res ; ", res);
                resolve(res);
            });
        });
        // return new Promise<ActionResult>((resolve,reject)=>{
        //     this.userService.findUserById(countryID)
        //     .then((result:ActionResult)=>{
        //         if(result.result.length==0)
        //         {
        //             result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
        //             result.result=null;
        //             return reject(result);
        //         }  
        //         let user:Customer=result.result[0];
        //         result.result=user.wallet;
        //         resolve(result);
        //     })
        //     .catch((error)=>reject(error))
        // })
    }
    updateRate(id, rate) {
        return this.db.updateInCollection(constants_1.default.collections.rate, {
            "_id": id
        }, {
            $set: rate
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], RateService.prototype, "db", void 0);
RateService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], RateService);
exports.RateService = RateService;
