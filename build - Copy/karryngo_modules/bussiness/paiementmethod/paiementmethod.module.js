"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementMethodRoutingModule = void 0;
const router_module_decorator_1 = require("../../../karryngo_core/routing/router_module.decorator");
const PaiementMethodController_1 = require("./PaiementMethodController");
let PaiementMethodRoutingModule = class PaiementMethodRoutingModule {
};
PaiementMethodRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/user/paiementmethod/list",
            "module": PaiementMethodController_1.PaiementMethodController,
            "actions": [
                {
                    "method": "get",
                    "action": "getPaiementList",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/user/paiementmethod/add",
            "module": PaiementMethodController_1.PaiementMethodController,
            "actions": [
                {
                    "method": "post",
                    "action": "addPaiementMethod",
                    "params": {
                        "number": "String",
                        "moneyCode": "String",
                        "type": "String"
                    }
                }
            ]
        },
    ])
], PaiementMethodRoutingModule);
exports.PaiementMethodRoutingModule = PaiementMethodRoutingModule;
