"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du demandeur
@created 30/11/2020
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
exports.RequesterServiceManager = exports.ServiceTransportBy = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const transportcolisservice_1 = require("../entities/transportcolisservice");
const transportpersontservice_1 = require("../entities/transportpersontservice");
const servicetypefactory_1 = require("../utils/servicetypefactory");
const transportservicemanager_1 = require("../transport_transaction/transportservicemanager");
const file_service_1 = require("../../../services/files/file.service");
const providerservicemanager_1 = require("../provider_transport_service/providerservicemanager");
const decorator_1 = require("../../../../karryngo_core/decorator");
const history_1 = require("../../../services/historique/history");
const historyService_1 = require("../../../services/historique/historyService");
const financialtransaction_1 = require("../../../services/payment/entities/financialtransaction");
const enums_1 = require("../../../services/payment/enums");
const customer_1 = require("../../authentification/entities/customer");
class ServiceTransportBy {
}
exports.ServiceTransportBy = ServiceTransportBy;
ServiceTransportBy.BIKE = "bike";
ServiceTransportBy.CAR = "car";
ServiceTransportBy.AIRPLANE = "airplane";
let RequesterServiceManager = class RequesterServiceManager {
    constructor(transportservicemanager, fileUploadService, providerService, userHistoryService) {
        this.transportservicemanager = transportservicemanager;
        this.fileUploadService = fileUploadService;
        this.providerService = providerService;
        this.userHistoryService = userHistoryService;
    }
    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request, response) {
        let service;
        if (request.body.options.typeof != transportpersontservice_1.TransportPersonService.typeof) {
            //service pour un colis
            service = new transportcolisservice_1.TransportColisService(new EntityID_1.EntityID());
        }
        else {
            service = new transportpersontservice_1.TransportPersonService(new EntityID_1.EntityID());
        }
        service.hydrate(request.body);
        service.idRequester = request.decoded.id;
        this.fileUploadService.uploadAll(request.body.options.images)
            .then((result) => {
            service.images = result.result;
            return this.db.addToCollection(constants_1.default.collections.requestservice, service);
        })
            .then((result) => {
            let history = new history_1.UserHistory(new EntityID_1.EntityID());
            history.serviceTransportID.setId(service.id.toString());
            let financialTransaction = new financialtransaction_1.FinancialTransaction(new EntityID_1.EntityID());
            financialTransaction.state = enums_1.FinancialTransactionState.FINANCIAL_TRANSACTION_START;
            financialTransaction.type = enums_1.FinancialTransactionType.DEPOSIT;
            // financialTransaction.ref=FinancialTransaction.generateRef();
            financialTransaction.error = enums_1.FinancialTransactionErrorType.NO_ERROR;
            history.financialTransaction = financialTransaction;
            let user = new customer_1.Customer();
            user.id.setId(service.idRequester);
            // console.log("result ",user)
            return this.userHistoryService.addHistory(user, history);
        })
            .then((result) => {
            response.status(201).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Requester service successfully created",
                result: {
                    idService: service.id.toString()
                }
            });
        })
            .catch((error) => {
            response.status(400).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    /**
     * @description permet de mettre a jour les informations lié a un service d'un fournisseur
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur
     */
    updateService(request, response) {
        this.db.updateInCollection(constants_1.default.collections.requestservice, { "_id": request.params.idService }, request.body, {})
            .then((data) => this.db.findInCollection(constants_1.default.collections.requestservice, { "_id": request.params.idService }))
            .then((data) => {
            let service = servicetypefactory_1.ServiceTypeFactory.getInstance(data.result[0].type);
            return this.providerService.findProvider(request, response, service._id, service, "Requester service updated successfully");
        })
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    /**
     * @description permet de supprimer un service
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur'
     */
    deleteService(request, response) {
    }
    getService(request, response) {
        let idServiceDescription = new EntityID_1.EntityID();
        idServiceDescription.setId(request.params.idService);
        this.transportservicemanager.getServiceById(idServiceDescription)
            .then((data) => {
            // console.log("Data ",data.result)
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Description service found",
                result: data.result,
            });
        })
            .catch((error) => {
            response.status(404).json({
                message: "Description not found",
                resultCode: ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }
    getServiceList(request, response) {
        this.db.findInCollection(constants_1.default.collections.requestservice, { "idRequester": request.decoded.id })
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Description service foundds",
                result: data.result,
            });
        })
            .catch((error) => {
            response.status(200).json({
                message: "Description not found",
                resultCode: ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], RequesterServiceManager.prototype, "db", void 0);
RequesterServiceManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [transportservicemanager_1.TransportServiceManager,
        file_service_1.FileService,
        providerservicemanager_1.ProviderServiceManager,
        historyService_1.HistoryService])
], RequesterServiceManager);
exports.RequesterServiceManager = RequesterServiceManager;
