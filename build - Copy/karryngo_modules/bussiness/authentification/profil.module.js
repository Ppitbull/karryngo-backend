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
exports.ProfilRoutingModule = void 0;
const router_module_decorator_1 = require("../../../karryngo_core/routing/router_module.decorator");
const authrequester_1 = __importDefault(require("./authrequester"));
let ProfilRoutingModule = class ProfilRoutingModule {
};
ProfilRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/requester/profil",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "get",
                    "action": "getProfil",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/user/profil/:idProfil",
            "module": authrequester_1.default,
            "actions": [
                {
                    "method": "get",
                    "action": "getUserProfil",
                    "params": {}
                }
            ]
        },
    ])
], ProfilRoutingModule);
exports.ProfilRoutingModule = ProfilRoutingModule;
