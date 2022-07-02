"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoutingModule = void 0;
const router_module_decorator_1 = require("../../../karryngo_core/routing/router_module.decorator");
const ControlBussTest_1 = require("./ControlBussTest");
let TestRoutingModule = class TestRoutingModule {
};
TestRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/users",
            "module": ControlBussTest_1.ControlBussTest,
            "actions": [
                {
                    "method": "get",
                    "action": "getAllUser",
                    "isSecure": false
                }
            ]
        },
        {
            "url": "/api/testupload",
            "module": ControlBussTest_1.ControlBussTest,
            "actions": [
                {
                    "method": "post",
                    "action": "testUpload",
                    "isSecure": false
                }
            ]
        },
        {
            "url": "/api/testdownload",
            "module": ControlBussTest_1.ControlBussTest,
            "actions": [
                {
                    "method": "get",
                    "action": "testdownLoad",
                    "isSecure": false
                }
            ]
        }
    ])
], TestRoutingModule);
exports.TestRoutingModule = TestRoutingModule;
