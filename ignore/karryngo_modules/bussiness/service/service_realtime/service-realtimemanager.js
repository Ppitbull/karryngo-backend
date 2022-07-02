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
exports.RealTimeChatManager = void 0;
const events_1 = require("events");
const decorator_1 = require("../../../../karryngo_core/decorator");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const realtime_protocole_1 = require("../../../services/realtime/realtime-protocole");
const realtime_service_1 = require("../../../services/realtime/realtime.service");
const router_realtime_service_1 = require("../../../services/realtime/router-realtime.service");
const transportservicemanager_1 = require("../transport_transaction/transportservicemanager");
let RealTimeChatManager = class RealTimeChatManager {
    constructor(realtimeService, eventEmiter, transportServiceManager, routerRealTimeService) {
        this.realtimeService = realtimeService;
        this.eventEmiter = eventEmiter;
        this.transportServiceManager = transportServiceManager;
        this.routerRealTimeService = routerRealTimeService;
        this.eventEmiter.on(realtime_protocole_1.RealTimeEvent.REALTIME_CONNEXION_STARTED, (socket) => this.init(socket));
    }
    init(socket) {
        console.log("Start transaction socket");
        socket.on(realtime_protocole_1.RealTimeTransactionMessageType.GET_TRANSACTION, (data) => {
            console.log("Transaction here");
            let senderId = new EntityID_1.EntityID();
            senderId.setId(data.senderID);
            let serviceID = new EntityID_1.EntityID();
            serviceID.setId(data.data.idProjet);
            let transactionID = new EntityID_1.EntityID();
            transactionID.setId(data.data.idTransaction);
            // console.log("senderID ",senderId.toString())
            this.transportServiceManager.getTransaction(transactionID)
                .then((result) => this.routerRealTimeService.send({
                senderID: realtime_protocole_1.UNKNOW_SENDER,
                receiverID: data.senderID,
                type: realtime_protocole_1.RealTimeTransactionMessageType.GET_TRANSACTION,
                data: result.result.toString(),
                error: realtime_protocole_1.RealTimeInitErrorType.SUCCESS
            }))
                .catch((error) => this.routerRealTimeService.send({
                senderID: realtime_protocole_1.UNKNOW_SENDER,
                receiverID: data.senderID,
                type: realtime_protocole_1.RealTimeTransactionMessageType.GET_TRANSACTION,
                error: realtime_protocole_1.RealTimeTransactionError.TRANSACTION_NOT_EXIST
            }));
        });
    }
};
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], RealTimeChatManager.prototype, "configService", void 0);
RealTimeChatManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [realtime_service_1.RealTimeService,
        events_1.EventEmitter,
        transportservicemanager_1.TransportServiceManager,
        router_realtime_service_1.RealTimeRouterService])
], RealTimeChatManager);
exports.RealTimeChatManager = RealTimeChatManager;
