"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 28/11/2020
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
exports.ServiceManager = void 0;
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const transportservicemanager_1 = require("./transportservicemanager");
const DataBaseException_1 = require("../../../../karryngo_core/exception/DataBaseException");
const chat_service_1 = require("../../../services/chats/chat.service");
const message_1 = require("../../../services/chats/message");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const discussion_1 = require("../../../services/chats/discussion");
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const providerservice_1 = require("../entities/providerservice");
const decorator_1 = require("../../../../karryngo_core/decorator");
const enums_1 = require("../../../services/payment/enums");
const historyService_1 = require("../../../services/historique/historyService");
let ServiceManager = class ServiceManager {
    constructor(transportServiceManager, chatService, userHistoryService
    // private chatRealTimeService:RealTimeChatManager,
    // private realTimeRouterService:RealTimeRouterService
    ) {
        this.transportServiceManager = transportServiceManager;
        this.chatService = chatService;
        this.userHistoryService = userHistoryService;
        // console.log("transportService ",this.transportServiceManager)
    }
    notifyUser(discuss, currentUserId, transactionID, messageContent, subType = false, subMessage = {}) {
        let message = new message_1.Message(new EntityID_1.EntityID());
        message.from.setId(currentUserId.toString());
        message.date = (new Date()).toISOString();
        message.content = messageContent;
        message.to.setId(currentUserId.toString() == discuss.inter1.toString()
            ? discuss.inter2.toString()
            : discuss.inter1.toString());
        return message;
    }
    rechercherFounisseurProximite(zone) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.provider, {
                "zones": {
                    $elemMatch: {
                        "country": zone.country,
                        "city": zone.city
                    },
                }
            })
                .then((data) => {
                //doit contenir la liste des fournisseurs de service
                //on resoud avec le resultat
                data.result = data.result.map((provider) => {
                    let id = new EntityID_1.EntityID();
                    id.setId(provider._id);
                    let pro = new providerservice_1.ProviderService(id);
                    pro.hydrate(provider);
                    return pro;
                });
                resolve(data);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    startTransaction(request, response) {
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        // console.log(this.transportServiceManager)
        this.transportServiceManager.startTransaction(request.body.idService, request.body.idProvider, request.body.idRequester)
            .then((data) => {
            let idTransaction = new EntityID_1.EntityID();
            idTransaction.setId(data.result.idTransaction);
            let discution = new discussion_1.Discussion(new EntityID_1.EntityID());
            discution.idProject = request.body.idService;
            discution.inter1.setId(request.body.idProvider);
            discution.inter2.setId(request.body.idRequester);
            let message = this.notifyUser(discution, currentUserId, idTransaction, "you have been selected to carry out this project");
            let idProject = new EntityID_1.EntityID();
            idProject.setId(request.body.idService);
            discution.idTransaction = data.result.idTransaction;
            discution.chats.push(message);
            return this.chatService.startDiscussion(discution);
        })
            .then((data) => {
            response.status(201).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Transaction started successfully",
            });
        })
            .catch((error) => {
            let code = 500;
            if (error.resultCode == DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR)
                code = 404;
            else if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_ALREADY_EXIST_ERROR)
                code = 400;
            response.status(code).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    acceptPrice(request, response) {
        console.log("data body ", request.body);
        let idTransaction = new EntityID_1.EntityID();
        idTransaction.setId(request.body.idTransaction);
        // console.log("data body ", request.body)
        let idService = new EntityID_1.EntityID();
        idService.setId(request.body.idService);
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        this.transportServiceManager.acceptServicePrice(idService, idTransaction).then((result) => this.chatService.findDisccussByTransactionID(idTransaction))
            .then((data) => {
            let message = this.notifyUser(data.result, currentUserId, idTransaction, "the price has been accepted");
            return this.chatService.send(message, data.result.id.toString());
        })
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Price setted successfully",
            });
        })
            .catch((error) => {
            let code = 500;
            if (error.resultCode == DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR)
                code = 404;
            else if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_ALREADY_EXIST_ERROR)
                code = 400;
            response.status(code).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    checkPaiement(request, response) {
        let refID = request.params.ref;
        let userID = new EntityID_1.EntityID();
        userID.setId(request.decoded.id);
        if (refID == null || refID == undefined) {
            response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: "Request reference not provided"
            });
        }
        else {
            this.transportServiceManager.checkPaiement(parseInt(refID), userID)
                .then((result) => {
                response.status(200).json({
                    resultCode: ActionResult_1.ActionResult.SUCCESS,
                    message: "Payment transaction found",
                    data: result.result.toString()
                });
            })
                .catch((error) => {
                console.log("Error ", error);
                let code = 500;
                let resultCode = error.resultCode;
                let message = error.message;
                if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                    code = 404;
                    resultCode = -1;
                    message = "Payment transaction not found";
                }
                response.status(code).json({
                    resultCode,
                    message
                });
            });
        }
    }
    updateStatus(request, response) {
    }
    makePaiement(request, response) {
        // console.log(request.body)
        let serviceID = new EntityID_1.EntityID();
        serviceID.setId(request.body.idService);
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        let idTransaction = new EntityID_1.EntityID();
        let history;
        this.transportServiceManager.makePaiement(serviceID, request.body.paiement_mode, currentUserId)
            .then((data) => {
            history = data.result.history;
            idTransaction.setId(data.result.service.idSelectedTransaction);
            return this.chatService.findDisccussByTransactionID(idTransaction);
        })
            .then((data) => {
            let message = this.notifyUser(data.result, currentUserId, idTransaction, "the payment has been confirmed");
            return this.chatService.send(message, data.result.id.toString());
        })
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Successful confirmation paiement",
                data: history.financialTransaction.toString()
            });
        })
            .catch((error) => {
            {
                console.log("Error ", error);
                let code = 500;
                let resultCode = error.resultCode;
                let message = error.message;
                if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                    code = 404;
                    resultCode = -1;
                    message = "Service not found";
                }
                else if (error.resultCode == ActionResult_1.ActionResult.INVALID_ARGUMENT) {
                    code = 400;
                    resultCode = -3;
                    message = "Cannot make paiement in that step of transaction";
                }
                else if (error.resultCode == enums_1.FinancialTransactionErrorType.BURER_NOT_FOUND_ERROR) {
                    code = 400;
                    resultCode = -201;
                    message = "Service requester payment account not found";
                }
                else if (error.resultCode == enums_1.FinancialTransactionErrorType.INSUFFICIENT_AMOUNT_ERROR) {
                    code = 400;
                    resultCode = -204;
                    message = "Insufficient account amount";
                }
                else if (error.resultCode == enums_1.FinancialTransactionErrorType.PAIMENT_METHOD_NOT_FOUND) {
                    code = 400;
                    resultCode = -205;
                    message = "payment method not found";
                }
                response.status(code).json({
                    resultCode,
                    message
                });
            }
        });
    }
    startRunningTransaction(request, response) {
        let idTransaction = new EntityID_1.EntityID();
        idTransaction.setId(request.body.idTransaction);
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        // console.log(request.body)
        this.transportServiceManager.startRunningTransaction(idTransaction)
            .then((data) => this.chatService.findDisccussByTransactionID(idTransaction))
            .then((data) => {
            let message = this.notifyUser(data.result, currentUserId, idTransaction, "package transport started");
            return this.chatService.send(message, data.result.id.toString());
        })
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Successful start running transaction",
            });
        })
            .catch((error) => {
            {
                let code = 500;
                if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                    code = 404;
                else if (error.resultCode == ActionResult_1.ActionResult.INVALID_ARGUMENT)
                    code = 400;
                response.status(code).json({
                    resultCode: error.resultCode,
                    message: error.message
                });
            }
        });
    }
    endTransaction(request, response) {
        let idTransaction = new EntityID_1.EntityID();
        idTransaction.setId(request.body.idTransaction);
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        this.transportServiceManager.endTransaction(idTransaction)
            .then((data) => this.chatService.findDisccussByTransactionID(idTransaction))
            .then((data) => {
            let message = this.notifyUser(data.result, currentUserId, idTransaction, "package transport ended");
            return this.chatService.send(message, data.result.id.toString());
        })
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Successful start end",
            });
        })
            .catch((error) => {
            {
                let code = 500;
                if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                    code = 404;
                else if (error.resultCode == ActionResult_1.ActionResult.INVALID_ARGUMENT)
                    code = 400;
                response.status(code).json({
                    resultCode: error.resultCode,
                    message: error.message
                });
            }
        });
    }
    getTransaction(request, response) {
        let idTransaction = new EntityID_1.EntityID();
        idTransaction.setId(request.params.idTransaction);
        this.transportServiceManager.getTransaction(idTransaction)
            .then((data) => response.status(200).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "Transaction found",
            result: data.result.toString()
        }))
            .catch((error) => {
            let code = 500;
            if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                code = 404;
            else
                code = 400;
            response.status(code).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    updatePrice(request, response) {
        console.log(request.body);
        let idTransaction = new EntityID_1.EntityID();
        idTransaction.setId(request.body.idTransaction);
        let trans;
        let discuss;
        let message;
        let currentUserId = new EntityID_1.EntityID();
        currentUserId.setId(request.decoded.id);
        //on recupere la transaction
        this.transportServiceManager.getTransaction(idTransaction)
            .then((result) => {
            trans = result.result;
            try {
                //on met a jour le prix. il lance une exception si le prix ext <0
                trans.updatePrice(request.body.price);
                //on met a jour la transaction dans le service 
                return this.transportServiceManager.updateServicePrice(trans);
            }
            catch (error) {
                result.resultCode = ActionResult_1.ActionResult.INVALID_ARGUMENT;
                result.message = error.getMessage();
                result.result = null;
                return Promise.reject(result);
            }
        }) //on recherche la discussion en fonction de la transaction
            .then((result) => this.chatService.findDisccussByTransaction(trans))
            .then((result) => {
            discuss = result.result;
            // The following line is commented by Landry. I just wnat to change the content of the message sent
            // let message:Message=this.notifyUser(discuss,currentUserId,idTransaction,"you have been selected to carry out this project")
            let message = this.notifyUser(discuss, currentUserId, idTransaction, "The price of this project has been updated");
            //on le sauvegarde comme non lu dans la bd
            return this.chatService.send(message, discuss.id.toString());
        })
            .then((result) => {
            //on notifie les tiers par temps reel
            // this.realTimeRouterService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.to.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:message
            // })
            // this.realTimeRouterService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.from.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:{
            //         idDisccuss:discuss.id.toString(),
            //         idTransaction:trans.id.toString(),
            //         message:message.toString()
            //     }
            // });
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Successful update price",
            });
        })
            .catch((error) => {
            let code = 500;
            if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                code = 404;
            else if (error.resultCode == ActionResult_1.ActionResult.INVALID_ARGUMENT)
                code = 400;
            response.status(code).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], ServiceManager.prototype, "db", void 0);
ServiceManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [transportservicemanager_1.TransportServiceManager,
        chat_service_1.ChatService,
        historyService_1.HistoryService
        // private chatRealTimeService:RealTimeChatManager,
        // private realTimeRouterService:RealTimeRouterService
    ])
], ServiceManager);
exports.ServiceManager = ServiceManager;
