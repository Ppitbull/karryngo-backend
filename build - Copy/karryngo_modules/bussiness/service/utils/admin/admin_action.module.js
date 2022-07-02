"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminActionRoutingModule = void 0;
const router_module_decorator_1 = require("../../../../../karryngo_core/routing/router_module.decorator");
const admin_action_1 = require("./admin_action");
let AdminActionRoutingModule = class AdminActionRoutingModule {
};
AdminActionRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            url: '/api/admin/account/accept_as_provider',
            module: admin_action_1.AdminAction,
            actions: [
                {
                    method: "post",
                    action: "acceptAsProvider",
                    "params": {
                        "email": "string"
                    }
                }
            ]
        },
        {
            url: '/api/admin/account/remove_as_provider',
            module: admin_action_1.AdminAction,
            actions: [
                {
                    method: "post",
                    action: "removeAsProvider",
                    "params": {
                        "email": "string"
                    }
                }
            ]
        },
        // {
        //     "url":"/api/chat/list",
        //     "module" :ChatManager,
        //     "actions":[
        //         {
        //             "method":"get",
        //             "action": "getDiscutionList",
        //             "params":{
        //             }
        //         }
        //     ]
        // },
    ])
], AdminActionRoutingModule);
exports.AdminActionRoutingModule = AdminActionRoutingModule;
