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
exports.PaiementMethodController = void 0;
const decorator_1 = require("../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const paiementmethodbuilder_1 = require("../../services/payment/entities/paiementmethodbuilder");
const paiementmethod_service_1 = require("../../services/payment/services/paiementmethod.service");
let PaiementMethodController = class PaiementMethodController {
    constructor(paiementMethodService) {
        this.paiementMethodService = paiementMethodService;
    }
    addPaiementMethod(request, response) {
        let type = request.body.type;
        let number = request.body.number;
        let moneyCode = request.body.moneyCode;
        let userID = new EntityID_1.EntityID();
        userID.setId(request.decoded.id);
        if (!type || !number || !moneyCode) {
            let errorMsg = "";
            if (type)
                errorMsg = "Argument type not found";
            if (number)
                errorMsg = "Argument number not found";
            if (moneyCode)
                errorMsg = "Argument moneyCode not found";
            return response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: errorMsg
            });
        }
        let paiementMethod = (0, paiementmethodbuilder_1.paiementMethodBuilder)(request.body);
        this.paiementMethodService.addMethodPaiement(userID, paiementMethod)
            .then((result) => {
            response.status(201).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Payement method created successfully"
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    getPaiementList(request, response) {
        let userID = new EntityID_1.EntityID();
        userID.setId(request.decoded.id);
        this.paiementMethodService.getAllPaiementMethod(userID)
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: 'list of method payment',
                result: result.result
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
};
PaiementMethodController = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [paiementmethod_service_1.PaiementMethodService])
], PaiementMethodController);
exports.PaiementMethodController = PaiementMethodController;
