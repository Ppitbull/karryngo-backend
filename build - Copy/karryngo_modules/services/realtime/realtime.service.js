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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTimeService = void 0;
const events_1 = require("events");
const socket_io_1 = __importDefault(require("socket.io"));
const decorator_1 = require("../../../karryngo_core/decorator");
const routerchecker_1 = require("../../../karryngo_core/routing/routerchecker");
const realtime_protocole_1 = require("./realtime-protocole");
const router_realtime_service_1 = require("./router-realtime.service");
const io = require('socket.io');
let RealTimeService = class RealTimeService {
    constructor(routerchecker, eventEmiter, routerRealTime) {
        this.routerchecker = routerchecker;
        this.eventEmiter = eventEmiter;
        this.routerRealTime = routerRealTime;
    }
    setKarryngoApp(kngApp) {
        this.kcore = kngApp;
    }
    init() {
        this.serverSocket = new socket_io_1.default(this.kcore.getServer(), {});
        // this.serverSocket=new WebSocket.Server({server:this.kcore.getServer()})
        this.serverSocket.on(realtime_protocole_1.RealTimeInitMessageType.NEW_CONNECTION, (socket) => {
            console.log("New Connection: ", socket.id);
            this.handShakeForNewConnection(socket);
            this.handDisconnect(socket);
            this.handleConnexionError(socket);
        });
    }
    handleConnexionError(socket) {
        socket.on(realtime_protocole_1.RealTimeInitErrorType.CONNEXION_ERROR, (err) => {
            console.log(`connect_error due to ${err.message}`);
        });
    }
    handDisconnect(socket) {
        socket.on(realtime_protocole_1.RealTimeInitMessageType.DISCONNECT, () => this.handleDesconnection(socket));
        socket.on(realtime_protocole_1.RealTimeInitMessageType.LOGOUT, (data) => this.handleDesconnection(socket));
    }
    handleDesconnection(socket) {
        console.log("Deconnexion");
        this.routerRealTime.removeSocketUser(socket.id);
        socket.removeAllListeners();
        socket.disconnect(true);
    }
    handShakeForNewConnection(socket) {
        socket.on(realtime_protocole_1.RealTimeInitMessageType.LOGGIN, (data) => {
            this.routerchecker.checkApiAccess(data.data.token)
                .then(() => {
                if (this.routerRealTime.hasUser(data.senderID)) {
                    this.routerRealTime.send({
                        receiverID: data.senderID,
                        senderID: realtime_protocole_1.UNKNOW_SENDER,
                        error: realtime_protocole_1.RealTimeInitErrorType.USER_ALREADY_EXIST,
                        type: realtime_protocole_1.RealTimeInitMessageType.LOGGIN
                    });
                }
                else if (this.routerRealTime.hasSocketUSer(socket.id)) {
                    this.routerRealTime.send({
                        receiverID: data.senderID,
                        senderID: realtime_protocole_1.UNKNOW_SENDER,
                        error: realtime_protocole_1.RealTimeInitErrorType.USER_ALREADY_CONNECTED,
                        type: realtime_protocole_1.RealTimeInitMessageType.LOGGIN
                    });
                }
                else {
                    this.routerRealTime.addUser(data.senderID, socket);
                    this.routerRealTime.addSocketUSer(socket.id, data.senderID);
                    this.routerRealTime.send({
                        senderID: realtime_protocole_1.UNKNOW_SENDER,
                        receiverID: data.senderID,
                        error: realtime_protocole_1.RealTimeInitErrorType.SUCCESS,
                        type: realtime_protocole_1.RealTimeInitMessageType.LOGGIN
                    });
                }
                this.eventEmiter.emit(realtime_protocole_1.RealTimeEvent.REALTIME_CONNEXION_STARTED, socket);
            })
                .catch(() => {
                this.routerRealTime.send({
                    senderID: realtime_protocole_1.UNKNOW_SENDER,
                    receiverID: data.senderID,
                    error: realtime_protocole_1.RealTimeInitErrorType.INVALID_USER_TOKEN,
                    type: realtime_protocole_1.RealTimeInitMessageType.LOGGIN
                });
                socket.disconnect();
            });
        });
    }
};
RealTimeService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [routerchecker_1.RouterChecker,
        events_1.EventEmitter,
        router_realtime_service_1.RealTimeRouterService])
], RealTimeService);
exports.RealTimeService = RealTimeService;
