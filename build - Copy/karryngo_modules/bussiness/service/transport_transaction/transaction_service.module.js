"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRoutingModule = void 0;
const router_module_decorator_1 = require("../../../../karryngo_core/routing/router_module.decorator");
const servicemanager_1 = require("./servicemanager");
let TransactionRoutingModule = class TransactionRoutingModule {
};
TransactionRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/requester/service/check_paiement/:ref",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "checkPaiement",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/update_paiement",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "updatePaiement",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/make_paiement",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "makePaiement",
                    "params": {
                        "idService": "string",
                        "paiement_mode": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/end",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "endTransaction",
                    "params": {
                        "idTransaction": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/start",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "startRunningTransaction",
                    "params": {
                        "idTransaction": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/start",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "startTransaction",
                    "params": {
                        "idService": "string",
                        "idProvider": "string",
                        "idRequester": "string",
                        "idInitiator": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/find/:idTransaction",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getTransaction",
                    "params": {
                        "idTransaction": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/accept_price",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "acceptPrice",
                    "params": {
                        "idService": "string",
                        "idTransaction": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/update_price",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "updatePrice",
                    "params": {
                        "idTransaction": "string",
                        "idMessage": "string",
                        "price": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/create_rate",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "createRate",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/change_rate/:rate_id",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "changeRate",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/country_rate/:country_id",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getRateByCountry",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/transaction/send_bill/:service_id",
            "module": servicemanager_1.ServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "sendBill",
                    "params": {}
                }
            ]
        },
    ])
], TransactionRoutingModule);
exports.TransactionRoutingModule = TransactionRoutingModule;
