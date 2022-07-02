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
exports.RapportContry = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
let RapportContry = class RapportContry {
    getPlatformCountyList(request, response) {
        this.db.findInCollection(constants_1.default.collections.user, {}, {
            "address.country": 1
        })
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "List of countries",
                result: [...new Set(result.result.map((country) => country.address.country))]
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
], RapportContry.prototype, "db", void 0);
RapportContry = __decorate([
    (0, decorator_1.Controller)()
], RapportContry);
exports.RapportContry = RapportContry;
