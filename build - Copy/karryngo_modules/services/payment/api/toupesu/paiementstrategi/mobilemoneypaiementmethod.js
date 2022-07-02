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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileMoneyPaiementMethod = void 0;
const decorator_1 = require("../../../../../../karryngo_core/decorator");
const financialtransaction_1 = require("../../../entities/financialtransaction");
class MobileMoneyPaiementMethod {
    constructor(paiementMethodeStrategyService) {
        this.paiementMethodeStrategyService = paiementMethodeStrategyService;
    }
    buy(transaction, buyer, paiementMethod) {
        let transactionRef = financialtransaction_1.FinancialTransaction.generateRef();
        return this.paiementMethodeStrategyService.buy(this.configService.getValueOf("paiement").paiementUrl, {
            refID: transactionRef,
            amount: transaction.price,
            moneyCode: paiementMethod.moneyCode,
            product: this.configService.getValueOf("paiement").product,
            msidn: paiementMethod.number,
            paymentMethod: paiementMethod.type
            // cancelUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].cancelUrl,
            // successUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].successUrl,
            // errorUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].errorUrl,
        });
    }
    check(financialTransaction, buyer, paiementMethod) {
        return this.paiementMethodeStrategyService.check(this.configService.getValueOf("paiement").checkPaiementUrl, {
            refID: financialTransaction.ref,
            product: this.configService.getValueOf("paiement").product,
            paymentMethod: financialTransaction.paiementMode
        });
    }
    cancel(transaction, buyer, paiementMethod) {
        return this.paiementMethodeStrategyService.cancel(this.configService.getValueOf("paiement").mtnCancelPaiementUrl, {});
    }
}
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], MobileMoneyPaiementMethod.prototype, "configService", void 0);
exports.MobileMoneyPaiementMethod = MobileMoneyPaiementMethod;
