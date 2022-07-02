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
exports.RealTimeRouterService = void 0;
const decorator_1 = require("../../../karryngo_core/decorator");
let RealTimeRouterService = class RealTimeRouterService {
    constructor() {
        this.listDiscution = [];
        this.listUserConnected = new Map();
        this.listSocketUser = new Map();
    }
    hasUser(userID) {
        return this.listUserConnected.has(userID);
    }
    hasSocketUSer(socketID) {
        return this.listSocketUser.has(socketID);
    }
    addSocketUSer(socketID, userID) {
        if (!this.hasSocketUSer(socketID))
            this.listSocketUser.set(socketID, userID);
    }
    removeSocketUser(id) {
        if (this.listSocketUser.has(id)) {
            this.removeUser(`${this.listSocketUser.get(id)}`);
            this.listSocketUser.delete(id);
        }
    }
    removeUser(userID) {
        if (this.hasUser(userID))
            this.listUserConnected.delete(userID);
    }
    addUser(userID, socket) {
        if (this.hasUser(userID))
            return;
        this.listUserConnected.set(userID, socket);
    }
    send(data) {
        var _a;
        if (!this.hasUser(data.receiverID))
            return;
        (_a = this.listUserConnected.get(data.receiverID)) === null || _a === void 0 ? void 0 : _a.emit(data.type.toString(), data);
    }
    addDiscussion(discution) {
        for (let disc of this.listDiscution) {
            if (discution.idUser1.toObject() == disc.idUser1.toObject() ||
                discution.idUser1.toObject() == disc.idUser2.toString() ||
                discution.idUser2.toObject() == disc.idUser1.toString() ||
                discution.idUser2.toString() == disc.idUser2.toString())
                return;
        }
    }
    getDiscutionByUserId(userId) {
        for (let disc of this.listDiscution) {
            if (disc.idUser1.toString() == userId.toString() || disc.idUser2.toString() == userId.toString())
                return disc;
        }
        return null;
    }
    getDiscutionById(discId) {
        for (let disc of this.listDiscution) {
            if (disc.idProjet.toString() == discId.toString())
                return disc;
        }
        return null;
    }
};
RealTimeRouterService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [])
], RealTimeRouterService);
exports.RealTimeRouterService = RealTimeRouterService;
