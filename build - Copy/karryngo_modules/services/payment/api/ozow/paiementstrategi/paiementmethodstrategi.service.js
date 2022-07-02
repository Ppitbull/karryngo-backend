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
exports.PaiementMethodStrategyService = void 0;
const decorator_1 = require("../../../../../../karryngo_core/decorator");
const krequest_1 = require("../../../../../../karryngo_core/http/client/krequest");
const restapi_1 = require("../../../../../../karryngo_core/http/client/restapi");
const financialtransaction_1 = require("../../../entities/financialtransaction");
const enums_1 = require("../../../enums");
let PaiementMethodStrategyService = class PaiementMethodStrategyService {
    constructor(restapi = new restapi_1.RestApi()) {
        this.restapi = restapi;
    }
    buy(url, data) {
        console.log("Data ", data);
        return new Promise((resolve, reject) => {
            let transactionRef = financialtransaction_1.FinancialTransaction.generateRef();
            this.restapi.sendRequest(new krequest_1.KRequest()
                .post()
                .json()
                .url(url)
                .data(data)).then((result) => {
                let response = result.result;
                console.log("result paiement ", response);
                if (response.getData().success == true) {
                    result.result = {
                        ref: transactionRef,
                        urlToRedirect: response.getData().url || "",
                        token: response.getData().pay_token,
                        error: enums_1.FinancialTransactionErrorType.NO_ERROR
                    };
                    resolve(result);
                }
                else {
                    result.result = {
                        state: enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR,
                        error: enums_1.FinancialTransactionErrorType.UNKNOW_ERROR
                    };
                    reject(result);
                }
            })
                .catch((error) => {
                console.log("Error 2", error);
                reject(error);
            });
        });
    }
    check(url, data) {
        return new Promise((resolve, reject) => {
            console.log("URL ", url);
            this.restapi.sendRequest(new krequest_1.KRequest()
                .post()
                .url(url)
                .json()
                .data(data))
                .then((result) => {
                let response = result.result;
                console.log("Data ", data);
                let datas = {
                    endDate: response.getData().paymentDate,
                    error: enums_1.FinancialTransactionErrorType.NO_ERROR,
                    reason: "",
                    status: enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR
                };
                console.log("response ", response.getData());
                if (response.getData().success == true) {
                    if (response.getData().status.toLowerCase() == "pending") {
                        datas["status"] = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                    }
                    else if (response.getData().status.toLowerCase() == "canceled") {
                        datas["status"] = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_PAUSE;
                    }
                    else if (response.getData().status.toLowerCase() == "successful") {
                        datas["status"] = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                    }
                    else if (response.getData().status.toLowerCase() == "failed") {
                        datas["status"] = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                    }
                    result.result = datas;
                    resolve(result);
                }
                reject(result);
            })
                .catch((error) => reject(error));
        });
    }
    cancel(url, data) {
        return new Promise((resolve, reject) => {
        });
    }
};
PaiementMethodStrategyService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [restapi_1.RestApi])
], PaiementMethodStrategyService);
exports.PaiementMethodStrategyService = PaiementMethodStrategyService;
