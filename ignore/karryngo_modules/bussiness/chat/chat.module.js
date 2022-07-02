"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutingModule = void 0;
const router_module_decorator_1 = require("../../../karryngo_core/routing/router_module.decorator");
const chatmanager_1 = require("./chatmanager");
let ChatRoutingModule = class ChatRoutingModule {
};
ChatRoutingModule = __decorate([
    (0, router_module_decorator_1.RouterModule)([
        {
            "url": "/api/chat/list",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getDiscutionList",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/chat/unread",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getUnreadDiscution",
                    "params": {}
                }
            ]
        },
        {
            "url": "/api/chat/mark_as_read",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "post",
                    "action": "markAsRead",
                    "params": {
                        "idMessage": "string",
                        "idDiscussion": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/chat/add",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getTransactionMessageList",
                    "params": {
                        "idDiscussion": "string",
                        "from": "string",
                        "to": "string",
                        "date": "string",
                        "title": "string",
                        "content": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/chat/message/add",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "post",
                    "action": "addMessage",
                    "params": {
                        "idDiscussion": "string",
                        "from": "string",
                        "to": "string",
                        "date": "string",
                        "title": "string",
                        "content": "string"
                    }
                }
            ]
        },
        {
            "url": "/api/chat/message/list",
            "module": chatmanager_1.ChatManager,
            "actions": [
                {
                    "method": "get",
                    "action": "getDiscutionChatList",
                    "params": {
                        "id_discuss": "string",
                        "numpage": "number",
                        "limit": "number"
                    }
                }
            ]
        }
    ])
], ChatRoutingModule);
exports.ChatRoutingModule = ChatRoutingModule;
