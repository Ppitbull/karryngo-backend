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
exports.RapportProvider = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
let RapportProvider = class RapportProvider {
    constructor() { }
    getProviderListByParams(request, response) {
        let country = request.params.country || "all";
        let type = request.params.type || "all";
        let status = request.params.status || "all";
        let findQuery = { "isProvider": true };
        if (country != "all")
            findQuery["address.country"] = new RegExp(country, "i");
        switch (type) {
            case "personnal":
                findQuery["isCompany"] = false;
                break;
            case "company":
                findQuery["isCompany"] = true;
                break;
        }
        switch (status) {
            case "accepted":
                findQuery["isAcceptedProvider"] = true;
                break;
            case "waiting":
                findQuery["isAcceptedProvider"] = false;
        }
        //console.log(findQuery)
        this.db.findInCollection(constants_1.default.collections.user, findQuery)
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "List of service providers",
                result: result.result
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], RapportProvider.prototype, "db", void 0);
RapportProvider = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [])
], RapportProvider);
exports.RapportProvider = RapportProvider;
