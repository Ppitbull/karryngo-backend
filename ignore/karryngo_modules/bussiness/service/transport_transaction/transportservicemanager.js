"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 22/11/2020
*/
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
exports.TransportServiceManager = void 0;
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const transactionservice_1 = require("../entities/transactionservice");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const servicetypefactory_1 = require("../utils/servicetypefactory");
const transportservicetype_1 = require("../entities/transportservicetype");
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const enums_1 = require("../../../services/payment/enums");
const usermanager_service_1 = require("../../../services/usermanager/usermanager.service");
const customer_1 = require("../../authentification/entities/customer");
const financialtransaction_1 = require("../../../services/payment/entities/financialtransaction");
const history_1 = require("../../../services/historique/history");
const historyService_1 = require("../../../services/historique/historyService");
const payment_service_1 = require("../../../services/payment/services/payment.service");
const payment_builder_1 = require("../../../services/payment/builder/payment.builder");
let TransportServiceManager = class TransportServiceManager {
    constructor(paymentService, userService, userHistoryService) {
        this.paymentService = paymentService;
        this.userService = userService;
        this.userHistoryService = userHistoryService;
        // console.log("hiezar")
    }
    /**
     * @description Permet au fournisseur du service d'accepté le prix proposé par le demandeur
     * @param idTransportService Identifiant du service (demande de service)
     * @param idTransaction Identifiant de la transaction (entre le demandeur et le fournisseur)
     * @param idProvider Identifiant du fournisseur de service
     * @param price prix lié au service
     */
    acceptServicePrice(idTransportService, idTransaction) {
        return this.db.findInCollection(constants_1.default.collections.requestservice, {
            "transactions": {
                $elemMatch: {
                    "_id": idTransaction.toString()
                }
            }
        })
            .then((data) => {
            //on instanci le bon type de service en fonction de son champ `type`
            let transportService = servicetypefactory_1.ServiceTypeFactory.getInstance(data.result[0].type);
            transportService.hydrate(data.result[0]); //on l'hydrate avec les données recupéré de la bd
            // console.log("DatSDFqa",transportService)
            //on recupere on instancie la transaction en question
            let transaction = transportService.transactions[0];
            //on essaie car les methodes de l'objet de transaction lance des exceptions celon des cas
            try {
                //on accepte le pix
                let e = transaction.acceptPrice(transportService.suggestedPrice);
                console.log(e);
                if (e == 1) {
                    data.result = null;
                    data.message = "la transaction doit être dans son état initial";
                    return Promise.reject(data);
                }
                //on met a jour la bd
                return this.db.updateInCollection(constants_1.default.collections.requestservice, {
                    "_id": idTransportService.toString(),
                    "transactions._id": idTransaction.toString()
                }, {
                    $set: {
                        "idSelectedProvider": transaction.idProvider.toString(),
                        "state": transportservicetype_1.TransportServiceTypeState.SERVICE_IN_TRANSACTION_STATE,
                        "idSelectedTransaction": idTransaction.toString(),
                        "transactions.$.state": transaction.state,
                        "transactions.$.price": transaction.price
                    }
                });
            }
            catch (e) {
                //si une exception est lancé on la capture et on la traite
                data.result = null;
                data.message = e.getMessage();
                data.resultCode = e.getCode();
                return Promise.reject(data);
            }
        });
    }
    /**
     * @description permet de débuté une nouvelle transaction
     * @param idTransportService Identifiant du service (demande de service)
     * @param idProvider Identifiant du fournisseur de service
     * @param idRequester Identifiant du demandeur de service
     */
    startTransaction(idTransportService, idProvider, idRequester) {
        return new Promise((resolve, reject) => {
            //on recupere le service en fonction de son id
            let message = {};
            let idTransaction = new EntityID_1.EntityID();
            this.db.findInCollection(constants_1.default.collections.requestservice, { "_id": idTransportService })
                .then((data) => {
                if (data.result[0].idSelectedTransaction == undefined ||
                    data.result[0].idSelectedTransaction == "") {
                    //si le service peut encore démaré une nouvelle
                    //on instance la service en fonction de son champ `type` en bd
                    let service = servicetypefactory_1.ServiceTypeFactory.getInstance(data.result[0].type);
                    service.hydrate(data.result[0]); //on l'hydrate avec les données de la bd
                    //on creer une nouvelle transaction, on spécific le demandeur et le founisseur et on l'on insere en bd
                    let transaction = new transactionservice_1.TransactionService(idTransaction);
                    transaction.idProvider = idProvider;
                    transaction.idRequester = idRequester;
                    message = {
                        from_city: data.result[0].address.from.city,
                        to_city: data.result[0].address.to.city,
                        title: data.result[0].title
                    };
                    let history = new history_1.UserHistory(new EntityID_1.EntityID());
                    history.serviceTransportID.setId(service.id.toString());
                    let financialTransaction = new financialtransaction_1.FinancialTransaction(new EntityID_1.EntityID());
                    financialTransaction.state = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START;
                    financialTransaction.type = enums_1.FinancialTransactionType.WITHDRAW;
                    // financialTransaction.ref=FinancialTransaction.generateRef();
                    financialTransaction.error = enums_1.FinancialTransactionErrorType.NO_ERROR;
                    history.financialTransaction = financialTransaction;
                    let user = new customer_1.Customer();
                    user.id.setId(transaction.idProvider);
                    return this.userHistoryService.addHistory(user, history)
                        .then((result) => this.db.updateInCollection(constants_1.default.collections.requestservice, { "_id": idTransportService.toString() }, {
                        $push: { "transactions": transaction.toString() }
                    }, {})); //doit précisé que l'on veux insérer dans l'array transactions)
                }
                else {
                    //si on ne peut plus créer une transaction a cette étape on rejete la promsee
                    // Voir document de spécification technique pour plus d'informations
                    data.result = null;
                    data.resultCode = ActionResult_1.ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                    data.message = "Impossible de créer une nouvelle transaction car le service est déjà accepté par un fournisseur";
                    return Promise.reject(data);
                }
            })
                .then((data) => {
                data.result = {
                    message,
                    idTransaction
                };
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    rejectServicePrice(transaction) {
        return new Promise((resolve, reject) => {
            //doit faire intéragir les notifications
        });
    }
    updateServicePrice(transaction) {
        return this.db.updateInCollection(constants_1.default.collections.requestservice, {
            "transactions._id": transaction.id.toString()
        }, {
            $set: {
                "transactions.$.price": transaction.price,
                "suggestedPrice": transaction.price
            }
        });
    }
    /**
     * @description Permet au demandeur de service d'effectué le paiement sur la plateforme
     * @param idService Identifiant du service
     * @param paiementMethodStrategi  Mode de paiement de type `PaiementStrategyType`
     * @param buyerID Identitifiant du payeur
     */
    makePaiement(idService, paiementMethodStrategi, buyerID) {
        return new Promise((resolve, reject) => {
            let transaction;
            let history;
            //on recupere le service en fonction de son identifiant
            this.getServiceById(idService)
                .then((data) => {
                // on instanci le service en fonction de son champ `type`
                //on fait le paiement
                try {
                    // console.log(data.result.TransactionService.price)
                    // console.log("-------------------")
                    let service = data.result;
                    transaction = service.transactions.find((trans) => trans.id.toString() == service.idSelectedTransaction);
                    // console.log(transaction)
                    let pay = {
                        "refID": transaction._id,
                        "amount": transaction.price,
                        "msidn": "+237675835953",
                        "moneyCode": "XAF",
                        "product": "Toupesu"
                    };
                    transaction.makePaiement(pay);
                    this.userService.findUserById(buyerID)
                        .then((result) => this.paymentService.makePaiement(payment_builder_1.PaymentBuilderService.getPaiementType().getMethodPaiment(paiementMethodStrategi), service, result.result[0], paiementMethodStrategi))
                        .then((value) => {
                        // console.log("idService ",idService,transaction.state)
                        history = value.result;
                        return this.updateServiceTransactionStatus(idService, transaction);
                    })
                        .then((value) => {
                        value.result = {
                            service,
                            history
                        };
                        resolve(value);
                    })
                        .catch((error) => reject(error));
                }
                catch (error) {
                    data.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                    data.message = error.message;
                    data.result = null;
                    return Promise.reject(data);
                }
            })
                .catch((error) => reject(error));
        });
    }
    checkPaiement(refID, buyerID) {
        return new Promise((resolve, reject) => {
            let userHistory;
            let financialTransaction;
            let service;
            this.userHistoryService.findHistoryByRefTransaction(buyerID, refID)
                .then((result) => {
                userHistory = result.result;
                return this.getServiceById(userHistory.serviceTransportID);
            })
                .then((result) => {
                service = result.result;
                let buyer = new customer_1.Customer(buyerID);
                let paymentMethod = null;
                try {
                    paymentMethod = payment_builder_1.PaymentBuilderService.getPaiementType().getMethodPaiment(userHistory.financialTransaction.paiementMode);
                }
                catch (error) {
                    let r = new ActionResult_1.ActionResult();
                    r.resultCode = error.code;
                    r.message = error.message;
                    r.result = null;
                    return Promise.reject(r);
                }
                return this.paymentService.checkPaiement(paymentMethod, service, userHistory.financialTransaction, buyer, userHistory.financialTransaction.paiementMode);
            })
                .then((result) => {
                console.log("ResultAction ", result);
                financialTransaction = userHistory.financialTransaction;
                financialTransaction.state = result.result.state;
                financialTransaction.endDate = result.result.endDate;
                return this.updateServiceTransactionStatus(service.id, service.transactions.find((transaction) => transaction._id.toString() == service.idSelectedTransaction));
            })
                .then((result) => {
                result.result = financialTransaction;
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
    updateServiceTransactionStatus(idService, transaction) {
        return this.db.updateInCollection(constants_1.default.collections.requestservice, {
            "_id": idService.toString(),
            "transactions._id": transaction.id.toString()
        }, {
            $set: {
                "transactions.$.state": transaction.state,
                "state": transaction.state
            }
        });
    }
    startRunningTransaction(idTransaction) {
        return this.getTransaction(idTransaction)
            .then((result) => {
            let transaction = result.result;
            try {
                transaction.startService();
                return this.db.updateInCollection(constants_1.default.collections.requestservice, {
                    "transactions._id": transaction.id.toString()
                }, {
                    $set: {
                        "transactions.$.state": transaction.state,
                    }
                });
            }
            catch (error) {
                result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                result.message = error._description;
                result.result = null;
                return Promise.reject(result);
            }
        });
    }
    /**
     *
     * @param idService identifiant du service
     * @param idTransaction identifiant de la transaction
     */
    endTransaction(idTransaction) {
        return this.getTransaction(idTransaction)
            .then((result) => {
            let transaction = result.result;
            try {
                transaction.serviceDone();
                return this.db.updateInCollection(constants_1.default.collections.requestservice, {
                    "transactions._id": transaction.id.toString()
                }, {
                    $set: {
                        "transactions.$.state": transaction.state,
                    }
                });
            }
            catch (error) {
                result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                result.message = error._description;
                result.result = null;
                return Promise.reject(result);
            }
        });
    }
    getTransaction(idTransaction) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.requestservice, {
                "transactions": {
                    $elemMatch: {
                        "_id": idTransaction.toString()
                    }
                }
            })
                .then((data) => {
                let transaction = new transactionservice_1.TransactionService();
                transaction.hydrate(data.result[0].transactions[0]);
                // console.log("Transaction ",transaction)
                data.result = transaction;
                resolve(data);
            });
        });
    }
    getServiceById(serviceID) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.requestservice, { "_id": serviceID.toString() })
                .then((result) => {
                if (result.result.length == 0) {
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result = null;
                    return reject(result);
                }
                let service = servicetypefactory_1.ServiceTypeFactory.getInstance(result.result.type);
                service.hydrate(result.result[0]);
                result.result = service;
                resolve(result);
            })
                .catch((error) => reject(error));
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], TransportServiceManager.prototype, "db", void 0);
TransportServiceManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [payment_service_1.PaymentService,
        usermanager_service_1.UserManagerService,
        historyService_1.HistoryService])
], TransportServiceManager);
exports.TransportServiceManager = TransportServiceManager;
