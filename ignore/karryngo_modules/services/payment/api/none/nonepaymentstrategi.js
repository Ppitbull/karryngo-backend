"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonePaiementMethodStrategi = void 0;
const ActionResult_1 = require("../../../../../karryngo_core/utils/ActionResult");
const financialtransaction_1 = require("../../entities/financialtransaction");
const enums_1 = require("../../enums");
class NonePaiementMethodStrategi {
    buy(transaction, buyer, paiementMethod) {
        let result = new ActionResult_1.ActionResult();
        let transactionRef = financialtransaction_1.FinancialTransaction.generateRef();
        result.result = {
            ref: transactionRef,
            urlToRedirect: "",
            token: "",
            error: enums_1.FinancialTransactionErrorType.NO_ERROR
        };
        return Promise.resolve(result);
    }
    check(financialTransaction, buyer, paiementMethod) {
        let result = new ActionResult_1.ActionResult();
        let datas = {
            endDate: "",
            error: enums_1.FinancialTransactionErrorType.NO_ERROR,
            reason: "",
            status: enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS
        };
        result.result = datas;
        return Promise.resolve(result);
    }
    cancel(transaction, buyer, paiementMethod) {
        throw new Error("Method not implemented.");
    }
}
exports.NonePaiementMethodStrategi = NonePaiementMethodStrategi;
