"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const router_module_decorator_1 = require("../../../karryngo_core/routing/router_module.decorator");
const authprovider_1 = require("./authprovider");
const authrequester_1 = __importDefault(require("./authrequester"));
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/auth/provider",
            "module": authprovider_1.AuthProvider,
            "actions": [
                {
                    "method": "post",
                    "action": "register",
                    "params": {}
                },
                {
                    "method": "get",
                    "action": "login"
                }
            ]
        }, {
            "url": "/api/auth/refresh-token",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "get",
                    "action": "refreshToken",
                    "params": {},
                    isSecure: false
                }
            ]
        },
        {
            "url": "/api/auth/requester",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "post",
                    "action": "register",
                    "isSecure": false,
                    "params": {}
                },
                {
                    "method": "get",
                    "action": "login",
                    "isSecure": false,
                    "params": {
                        "email": "string",
                        "password": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/auth/forget-password",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "post",
                    "action": "forgotPassword",
                    "isSecure": false,
                    "params": {
                        "email": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/auth/reset-password",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "post",
                    "action": "resetPassword",
                    "params": {
                        "password": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/auth/login",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "post",
                    "action": "login",
                    "isSecure": false,
                    "params": {
                        "email": "string",
                        "password": "string"
                    }
                }
            ]
        },
    ])
], AuthModule);
exports.AuthModule = AuthModule;
