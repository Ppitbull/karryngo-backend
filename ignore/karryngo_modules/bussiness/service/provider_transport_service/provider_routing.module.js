"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderTransportServiceRoutingModule = void 0;
const router_module_decorator_1 = require("../../../../karryngo_core/routing/router_module.decorator");
const providerservicemanager_1 = require("./providerservicemanager");
let ProviderTransportServiceRoutingModule = class ProviderTransportServiceRoutingModule {
};
ProviderTransportServiceRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/provider/service/add",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "addService",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/provider/service/find",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "findServiceProviderByZone",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/provider/service/list",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getServiceList",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/provider/service/:idProviderService",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getService",
                    "params": {
                        "idProviderService": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/provider/service/vehicle/add",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "addVehicle",
                    "params": {
                        "type": "string",
                        "name": "string",
                        "marque": "string",
                        "photo": "string",
                        "placeNumbler": "number",
                        "description": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/provider/service/zone/add",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "addZone",
                    "params": {
                        "long": "double",
                        "lat": "double",
                        "name": "string",
                        "country": "string",
                        "city": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/provider/service/zone/list",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getZoneList",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/provider/service/vehicle/list",
            "module": providerservicemanager_1.ProviderServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getVehicleList",
                    "params": {}
                }
            ]
        },
    ])
], ProviderTransportServiceRoutingModule);
exports.ProviderTransportServiceRoutingModule = ProviderTransportServiceRoutingModule;
