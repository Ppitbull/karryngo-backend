"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les personnes
@created 30/11/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportPersonService = void 0;
const transportservicetype_1 = require("./transportservicetype");
class TransportPersonService extends transportservicetype_1.TransportServiceType {
    constructor() {
        super(...arguments);
        this.time = new Date();
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { type: TransportPersonService.TYPE });
    }
}
exports.TransportPersonService = TransportPersonService;
TransportPersonService.TYPE = "TransportPersonService";
TransportPersonService.typeof = "person";
