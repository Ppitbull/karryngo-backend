"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementStrategyType = exports.FinancialTransactionErrorType = exports.FinancialTransactionType = exports.FinancialTransactionState = void 0;
var FinancialTransactionState;
(function (FinancialTransactionState) {
    FinancialTransactionState["FINANCIAL_TRANSACTION_PENDING"] = "financial_transaction_pending";
    FinancialTransactionState["FINANCIAL_TRANSACTION_ERROR"] = "financial_transaction_error";
    FinancialTransactionState["FINANCIAL_TRANSACTION_SUCCESS"] = "financial_transaction_success";
    FinancialTransactionState["FINANCIAL_TRANSACTION_START"] = "financial_transaction_start";
    FinancialTransactionState["FINANCIAL_TRANSACTION_PAUSE"] = "financial_transaction_pause";
})(FinancialTransactionState = exports.FinancialTransactionState || (exports.FinancialTransactionState = {}));
var FinancialTransactionType;
(function (FinancialTransactionType) {
    FinancialTransactionType["DEPOSIT"] = "deposit";
    FinancialTransactionType["WITHDRAW"] = "withdraw";
})(FinancialTransactionType = exports.FinancialTransactionType || (exports.FinancialTransactionType = {}));
var FinancialTransactionErrorType;
(function (FinancialTransactionErrorType) {
    FinancialTransactionErrorType[FinancialTransactionErrorType["BURER_NOT_FOUND_ERROR"] = -201] = "BURER_NOT_FOUND_ERROR";
    FinancialTransactionErrorType[FinancialTransactionErrorType["RECEIVER_NOT_FOUND_ERROR"] = -202] = "RECEIVER_NOT_FOUND_ERROR";
    FinancialTransactionErrorType[FinancialTransactionErrorType["NO_ERROR"] = 0] = "NO_ERROR";
    FinancialTransactionErrorType[FinancialTransactionErrorType["UNKNOW_ERROR"] = -200] = "UNKNOW_ERROR";
    FinancialTransactionErrorType[FinancialTransactionErrorType["INSUFFICIENT_AMOUNT_ERROR"] = -204] = "INSUFFICIENT_AMOUNT_ERROR";
    FinancialTransactionErrorType[FinancialTransactionErrorType["PAIMENT_METHOD_NOT_FOUND"] = -205] = "PAIMENT_METHOD_NOT_FOUND";
})(FinancialTransactionErrorType = exports.FinancialTransactionErrorType || (exports.FinancialTransactionErrorType = {}));
var PaiementStrategyType;
(function (PaiementStrategyType) {
    PaiementStrategyType["BANK"] = "bank";
    PaiementStrategyType["ORANGE_MONEY"] = "ORANGE";
    PaiementStrategyType["MTN_MONEY"] = "MTN";
    PaiementStrategyType["CREDIT_CARD"] = "credit_card";
})(PaiementStrategyType = exports.PaiementStrategyType || (exports.PaiementStrategyType = {}));
