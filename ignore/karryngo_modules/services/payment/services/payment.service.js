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
exports.PaymentService = void 0;
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const historyService_1 = require("../../historique/historyService");
const enums_1 = require("../enums");
const wallet_service_1 = require("./wallet.service");
let PaymentService = class PaymentService {
    constructor(historyService, walletService) {
        this.historyService = historyService;
        this.walletService = walletService;
    }
    makePaiement(paiementMethodStrategy, service, buyer, paiementMethod) {
        return new Promise((resolve, reject) => {
            let history;
            let paiementMethodEntity;
            let transaction;
            this.historyService.findHistory(buyer, service.id)
                .then((result) => {
                // console.log("REsult ",result,service.id)
                if (result.result.length == 0) {
                    result.result = [];
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    return Promise.reject(result);
                }
                history = result.result[0];
                paiementMethodEntity = buyer.paimentMethodList.find((p) => p.type == paiementMethod);
                if (paiementMethodEntity) {
                    transaction = service.transactions.find((transaction) => transaction.id.toString() == service.idSelectedTransaction);
                    return paiementMethodStrategy.buy(transaction, buyer, paiementMethodEntity);
                }
                result.result = null;
                result.resultCode = enums_1.FinancialTransactionErrorType.PAIMENT_METHOD_NOT_FOUND;
                return Promise.reject(result);
            })
                .then((result) => {
                history.financialTransaction.state = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                history.financialTransaction.startDate = new Date().toISOString();
                history.financialTransaction.amount = parseInt(transaction.price.toString());
                history.financialTransaction.ref = result.result.ref;
                history.financialTransaction.urlToRedirect = result.result.urlToRedirect;
                history.financialTransaction.token = result.result.token;
                history.financialTransaction.error = result.result.error;
                history.financialTransaction.paiementMode = paiementMethodEntity.type;
                history.financialTransaction.type = enums_1.FinancialTransactionType.DEPOSIT;
                history.financialTransaction.endDate = "";
                return this.historyService.updateTransaction(buyer, service.id, history.toString());
            })
                .then((result) => {
                result.result = history;
                resolve(result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    updatePaiement(buyer, service, stateData, financialTransaction) {
        return new Promise((resolve, reject) => {
            this.historyService.updateTransactionState(buyer, service.id, stateData)
                .then((result) => {
                if (stateData["state"] == enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS) {
                    if (financialTransaction.type == enums_1.FinancialTransactionType.DEPOSIT) {
                        return this.walletService.increaseWallet(buyer.id, financialTransaction.amount);
                    }
                    else {
                        return this.walletService.decreaseWallet(buyer.id, financialTransaction.amount);
                    }
                }
                console.log("StateDatate", stateData);
                resolve(result);
            })
                .then((result) => resolve(result))
                .catch((error) => reject(error));
        });
    }
    checkPaiement(toupesuPaiementMethod, service, financialTransaction, buyer, paiementMethod) {
        let r = { endDate: "", state: enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START };
        return new Promise((resolve, reject) => {
            toupesuPaiementMethod.check(financialTransaction, buyer, buyer.paimentMethodList.find((paiementMethodEntity) => paiementMethodEntity.type == paiementMethod))
                .then((result) => {
                r = {
                    state: result.result.status,
                    endDate: result.result.endDate
                };
                return this.updatePaiement(buyer, service, r, financialTransaction);
            })
                .then((result) => {
                result.result = r;
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    cancelPaiement(toupesuPaiementMethod, transactionservice, buyer, paiementMethod) {
        throw new Error("Method not implemented.");
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], PaymentService.prototype, "db", void 0);
PaymentService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [historyService_1.HistoryService, wallet_service_1.WalletService])
], PaymentService);
exports.PaymentService = PaymentService;
