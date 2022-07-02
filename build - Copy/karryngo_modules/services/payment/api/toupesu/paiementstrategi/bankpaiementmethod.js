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
exports.BankPaiementStrategy = void 0;
const constants_1 = __importDefault(require("../../../../../../config-files/constants"));
const decorator_1 = require("../../../../../../karryngo_core/decorator");
const financialtransaction_1 = require("../../../entities/financialtransaction");
class BankPaiementStrategy {
    constructor(paiementMethodeStrategyService) {
        this.paiementMethodeStrategyService = paiementMethodeStrategyService;
    }
    buy(transaction, buyer, paiementMethod) {
        let transactionRef = financialtransaction_1.FinancialTransaction.generateRef();
        return this.paiementMethodeStrategyService.buy(this.configService.getValueOf("paiement").ozowPaiementUrl, {
            refID: transactionRef,
            amount: transaction.price,
            moneyCode: paiementMethod.moneyCode,
            cancelUrl: this.configService.getValueOf("paiement")[constants_1.default.env_mode].cancelUrl,
            successUrl: this.configService.getValueOf("paiement")[constants_1.default.env_mode].successUrl,
            errorUrl: this.configService.getValueOf("paiement")[constants_1.default.env_mode].errorUrl,
            product: this.configService.getValueOf("paiement").product
        });
    }
    check(financialTransaction, buyer, paiementMethod) {
        return this.paiementMethodeStrategyService.check(this.configService.getValueOf("paiement").ozowCheckPaiementUrl, {
            refid: financialTransaction.ref,
            product: this.configService.getValueOf("paiement").product
        });
    }
    cancel(transaction, buyer, paiementMethod) {
        return this.paiementMethodeStrategyService.cancel("", {});
    }
}
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], BankPaiementStrategy.prototype, "configService", void 0);
exports.BankPaiementStrategy = BankPaiementStrategy;
