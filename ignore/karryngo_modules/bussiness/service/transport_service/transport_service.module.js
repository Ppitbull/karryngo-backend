"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportServiceRoutingModule = void 0;
const router_module_decorator_1 = require("../../../../karryngo_core/routing/router_module.decorator");
const requesterservicemanager_1 = require("./requesterservicemanager");
let TransportServiceRoutingModule = class TransportServiceRoutingModule {
};
TransportServiceRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/requester/service/add",
            "module": requesterservicemanager_1.RequesterServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "addService",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/list",
            "module": requesterservicemanager_1.RequesterServiceManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getServiceList",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/requester/service/one/:idService",
            "module": requesterservicemanager_1.RequesterServiceManager,
            "actions": [
                {
                    "method": "post",
                    "action": "updateService",
                    "params": {
                        "idService": "string"
                    }
                },
                {
                    "method": "get",
                    "action": "getService",
                    "params": {
                        "idService": "string"
                    }
                }
            ]
        },
    ])
], TransportServiceRoutingModule);
exports.TransportServiceRoutingModule = TransportServiceRoutingModule;
