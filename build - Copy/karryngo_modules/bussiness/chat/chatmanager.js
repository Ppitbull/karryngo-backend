"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatManager = void 0;
const decorator_1 = require("../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const chat_service_1 = require("../../services/chats/chat.service");
const message_1 = require("../../services/chats/message");
const chat_realtimemanager_1 = require("./chat-realtimemanager");
let ChatManager = class ChatManager {
    constructor(chatService, chatRealTimeService) {
        this.chatService = chatService;
    }
    addMessage(request, response) {
        let message = new message_1.Message(new EntityID_1.EntityID());
        message.hydrate(request.body);
        message.id = new EntityID_1.EntityID();
        // if(({}).constructor==message.content.constructor)
        // {
        // }
        this.chatService.send(message, request.body.idDiscussion)
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: {
                    idMessage: message.id,
                    message: "Message send successfully"
                },
                result: null,
            });
        })
            .catch((error) => {
            response.status(400).json(error.toString());
        });
    }
    getTransactionMessageList(request, response) {
        this.chatService.readAll(request.body.idDiscussion)
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "List of messages",
                result: data.result,
            });
        })
            .catch((error) => {
            response.status(400).json(error.toString());
        });
    }
    getUnreadDiscution(request, response) {
        this.chatService.getUnreadDiscution()
            .then((data) => response.status(200).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "List of unread message",
            result: data.result
        }))
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    getDiscutionChatList(request, response) {
        let idDiscuss = new EntityID_1.EntityID();
        let numpage = parseInt(request.query.page || 0);
        let limit = parseInt(request.query.limit || 10);
        if (!request.query.id_discuss) {
            return response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: "ID Discuss not supplied"
            });
        }
        idDiscuss.setId(request.query.id_discuss);
        this.chatService
            .getDiscussionChatList(idDiscuss, numpage, limit)
            .then((result) => {
            response.status(200).json({
                resultCode: result.resultCode,
                result: result.result.map((disc) => disc.toString())
            });
        })
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    getDiscutionList(request, response) {
        let id = new EntityID_1.EntityID();
        id.setId(request.decoded.id);
        let numpage = parseInt(request.query.page || 0);
        let limit = parseInt(request.query.limit || 10);
        console.log(request.query);
        this.chatService
            .getDiscussionList(id, numpage, limit)
            .then((result) => {
            response.status(200).json({
                resultCode: result.resultCode,
                result: result.result.map((disc) => disc.toString())
            });
        })
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    markAsRead(request, response) {
        this.chatService.markAsRead(request.body.idDiscussion, request.body.idMessage)
            .then((data) => response.status(200).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "message has been marked as read successfully"
        }))
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
};
ChatManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        chat_realtimemanager_1.RealTimeChatManager])
], ChatManager);
exports.ChatManager = ChatManager;
