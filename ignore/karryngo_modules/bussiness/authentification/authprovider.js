"use strict";
/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des
    fournisseur de service
@created 13/10/2020
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
const decorator_1 = require("../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const usermanager_service_1 = require("../../services/usermanager/usermanager.service");
const providerservicemanager_1 = require("../service/provider_transport_service/providerservicemanager");
let AuthProvider = class AuthProvider {
    constructor(userManagerService, providerServiceManager) {
        this.userManagerService = userManagerService;
        this.providerServiceManager = providerServiceManager;
    }
    /**
     * Permet de senregistrer pour devenir fournisseurs de service
     * @param request
     * @param response
     */
    register(request, response) {
        // type: 0 personnel, 1 compagny
        let data = {
            isProvider: true,
            isAcceptedProvider: false,
            isCompany: false,
            passportNumber: request.body.passportNumber
        };
        let userId = new EntityID_1.EntityID();
        userId.setId(request.decoded.id);
        if (request.body.type == 1) {
            data['companyName'] = request.body.companyName,
                data['registrationNumber'] = request.body.registrationNumber,
                data['importExportCompagnyCode'] = request.body.importExportCompagnyCode;
            data['companyAddress'] = request.body.companyAddress;
            data['isCompany'] = true;
        }
        // console.log("register provider",data)
        this.userManagerService.findUserById(userId)
            .then((dataResult) => this.userManagerService.saveUser(userId, data))
            .then((data) => this.providerServiceManager.addService(request, response))
            .catch((error) => {
            if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                response.status(404).json({
                    resultCode: error.resultCode,
                    message: error.message
                });
            else
                response.status(500).json({
                    resultCode: error.resultCode,
                    message: error.message
                });
        });
    }
    login(request, response) {
    }
};
AuthProvider = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService,
        providerservicemanager_1.ProviderServiceManager])
], AuthProvider);
exports.AuthProvider = AuthProvider;
