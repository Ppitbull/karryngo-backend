"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialTransaction = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const enums_1 = require("../enums");
class FinancialTransaction extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.state = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START;
        this.startDate = "";
        this.endDate = "";
        this.amount = 0;
        this.type = enums_1.FinancialTransactionType.DEPOSIT;
        this.ref = 0;
        this.urlToRedirect = "";
        this.token = "";
        this.error = enums_1.FinancialTransactionErrorType.NO_ERROR;
        this.paiementMode = enums_1.PaiementStrategyType.BANK;
    }
    toString() {
        return {
            state: this.state,
            startDate: this.startDate,
            endDate: this.endDate,
            amount: this.amount,
            type: this.type,
            ref: this.ref,
            urlToRedirect: this.urlToRedirect,
            token: this.token,
            error: this.error,
            paiementMode: this.paiementMode
        };
    }
    static generateRef() {
        return `${Math.floor(Math.random() * 100000)}`;
    }
}
exports.FinancialTransaction = FinancialTransaction;
