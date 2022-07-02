"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RapportServiceRoutingModule = void 0;
const router_module_decorator_1 = require("../../../../karryngo_core/routing/router_module.decorator");
const rapport_servicemodule_1 = require("./rapport_servicemodule");
let RapportServiceRoutingModule = class RapportServiceRoutingModule {
};
RapportServiceRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/manager/service/get_list/:state?/:year?/:month?/:day?",
            "module": rapport_servicemodule_1.RapportService,
            "actions": [
                {
                    "method": "get",
                    "action": "getServiceListByTime"
                }
            ]
        },
        {
            "url": "/api/manager/service/financial/price/:state?/:year?/:month?/:day?",
            "module": rapport_servicemodule_1.RapportService,
            "actions": [
                {
                    "method": "get",
                    "action": "getServicePriceByTime"
                }
            ]
        },
        {
            "url": "/api/manager/service/get/:type/:iduser/:state/:year?/:month?/:day?",
            "module": rapport_servicemodule_1.RapportService,
            "actions": [
                {
                    "method": "get",
                    "action": "getServices"
                }
            ]
        },
    ])
], RapportServiceRoutingModule);
exports.RapportServiceRoutingModule = RapportServiceRoutingModule;
