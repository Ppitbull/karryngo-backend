"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilePaiementMethodEntity = void 0;
const enums_1 = require("../enums");
const paiementmethodentity_1 = require("./paiementmethodentity");
class MobilePaiementMethodEntity extends paiementmethodentity_1.PaiementMethodEntity {
    constructor() {
        super(...arguments);
        this.type = enums_1.PaiementStrategyType.ORANGE_MONEY;
        this.number = "";
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { number: this.number });
    }
}
exports.MobilePaiementMethodEntity = MobilePaiementMethodEntity;
