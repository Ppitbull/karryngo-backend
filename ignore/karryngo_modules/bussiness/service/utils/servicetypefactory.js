"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypeFactory = void 0;
const transportcolisservice_1 = require("../entities/transportcolisservice");
const transportpersontservice_1 = require("../entities/transportpersontservice");
class ServiceTypeFactory {
    static getInstance(type) {
        if (type == transportpersontservice_1.TransportPersonService.TYPE)
            return new transportpersontservice_1.TransportPersonService();
        //TransportColisService.TYPE:
        return new transportcolisservice_1.TransportColisService();
    }
}
exports.ServiceTypeFactory = ServiceTypeFactory;
