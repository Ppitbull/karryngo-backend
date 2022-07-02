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
exports.RealTimeChatManager = exports.RealTimeChatError = exports.RealTimeChatMessageType = void 0;
const chat_service_1 = require("../../services/chats/chat.service");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const realtime_protocole_1 = require("../../services/realtime/realtime-protocole");
// import { KarryngoEventEmitter } from "../../../karryngo_core/event/kevent";
const router_realtime_service_1 = require("../../services/realtime/router-realtime.service");
const message_1 = require("../../services/chats/message");
const events_1 = require("events");
const decorator_1 = require("../../../karryngo_core/decorator");
var RealTimeChatMessageType;
(function (RealTimeChatMessageType) {
    RealTimeChatMessageType["SEND_MESSAGE"] = "send_message";
    RealTimeChatMessageType["GET_DISCUSSIONS"] = "get_discussions";
    RealTimeChatMessageType["GET_MESSAGE_OF_DISCUSION"] = "get_message_discussion";
    RealTimeChatMessageType["MARK_MESSAGE_AS_READ"] = "mark_message_as_read";
})(RealTimeChatMessageType = exports.RealTimeChatMessageType || (exports.RealTimeChatMessageType = {}));
var RealTimeChatError;
(function (RealTimeChatError) {
    RealTimeChatError[RealTimeChatError["MESSAGE_NOT_EXIST"] = 0] = "MESSAGE_NOT_EXIST";
})(RealTimeChatError = exports.RealTimeChatError || (exports.RealTimeChatError = {}));
let RealTimeChatManager = class RealTimeChatManager {
    constructor(chatService, eventEmiter, routerRealTimeService) {
        this.chatService = chatService;
        this.eventEmiter = eventEmiter;
        this.routerRealTimeService = routerRealTimeService;
        this.eventEmiter.on(realtime_protocole_1.RealTimeEvent.REALTIME_CONNEXION_STARTED, (socket) => this.init(socket));
        console.log("Realtime manager start");
    }
    init(socket) {
        socket.on(RealTimeChatMessageType.GET_DISCUSSIONS, (data) => {
            let senderId = new EntityID_1.EntityID();
            senderId.setId(data.senderID);
            // console.log("senderID ",senderId.toString())
            this.chatService.getDiscussionList(senderId)
                .then((result) => {
                // console.log("Realt time discu: ",result)
                this.routerRealTimeService.send({
                    senderID: realtime_protocole_1.UNKNOW_SENDER,
                    receiverID: data.senderID,
                    type: RealTimeChatMessageType.GET_DISCUSSIONS,
                    data: result.result.map((data) => data.toString()),
                    error: realtime_protocole_1.RealTimeInitErrorType.SUCCESS
                });
            })
                .catch((error) => {
                this.routerRealTimeService.send({
                    senderID: realtime_protocole_1.UNKNOW_SENDER,
                    receiverID: data.senderID,
                    type: RealTimeChatMessageType.GET_DISCUSSIONS,
                    error: realtime_protocole_1.RealTimeInitErrorType.UNKNOW_ERROR
                });
            });
        });
        socket.on(RealTimeChatMessageType.SEND_MESSAGE, (data) => this.handleSendMessage(data));
    }
    handleSendMessage(data) {
        // console.log("new msessa" ,data)
        let id = new EntityID_1.EntityID();
        id.setId(data.data._id);
        let fromId = new EntityID_1.EntityID();
        fromId.setId(data.data.from);
        let toId = new EntityID_1.EntityID();
        toId.setId(data.data.to);
        let discId = new EntityID_1.EntityID();
        discId.setId(data.data.idDiscussion);
        let message = new message_1.Message(id);
        message.to.setId(data.data.to);
        message.from.setId(data.data.from);
        message.date = data.data.date;
        message.content = data.data.content;
        this.chatService.findMessageByDiscussionId(id, discId)
            .then((result) => {
            // console.log("result ",result)
            if (result.result && result.result.length == 0) {
                this.chatService.send(message, data.data.idDiscussion)
                    .then((result) => this.routerRealTimeService.send(data));
            }
        })
            .catch((error) => {
            // console.log("error ",error)
            this.chatService.send(message, data.data.idDiscussion)
                .then((result) => this.routerRealTimeService.send(data));
        });
    }
    notifyUser(discuss, currentUserId, transactionID, messageContent, subType = false, subMessage = {}) {
        let message = new message_1.Message(new EntityID_1.EntityID());
        message.from.setId(currentUserId.toString().toString());
        message.date = (new Date()).toISOString();
        message.content = messageContent;
        message.to.setId(currentUserId.toString().toString() == discuss.inter1.toString()
            ? discuss.inter2.toString()
            : discuss.inter1.toString());
        this.routerRealTimeService.send({
            senderID: message.from.toString().toString(),
            receiverID: message.to.toString().toString(),
            type: RealTimeChatMessageType.SEND_MESSAGE,
            error: realtime_protocole_1.RealTimeInitErrorType.SUCCESS,
            data: {
                idDisccuss: discuss.id.toString(),
                idTransaction: transactionID.toString().toString(),
                message: message.toString()
            }
        });
        this.routerRealTimeService.send({
            senderID: message.from.toString().toString(),
            receiverID: message.from.toString().toString(),
            type: RealTimeChatMessageType.SEND_MESSAGE,
            error: realtime_protocole_1.RealTimeInitErrorType.SUCCESS,
            data: {
                idDisccuss: discuss.id.toString(),
                idTransaction: transactionID.toString().toString(),
                message: message.toString()
            }
        });
        return message;
    }
};
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], RealTimeChatManager.prototype, "configService", void 0);
RealTimeChatManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_1.ChatService,
        events_1.EventEmitter,
        router_realtime_service_1.RealTimeRouterService])
], RealTimeChatManager);
exports.RealTimeChatManager = RealTimeChatManager;
