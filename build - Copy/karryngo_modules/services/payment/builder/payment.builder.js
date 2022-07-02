"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentBuilderService = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const DynamicLoader_1 = require("../../../../karryngo_core/utils/DynamicLoader");
let PaymentBuilderService = class PaymentBuilderService {
    static getPaiementType() {
        return DynamicLoader_1.DynamicLoader.load(`${constants_1.default.path_for_bussiness_service}/payment/api/${constants_1.default.api_for_payement}/${constants_1.default.api_for_payement}paymentmethodfactory`);
    }
};
PaymentBuilderService = __decorate([
    (0, decorator_1.Service)()
], PaymentBuilderService);
exports.PaymentBuilderService = PaymentBuilderService;
