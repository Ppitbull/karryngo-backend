"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankPaiementMethodEntity = void 0;
const enums_1 = require("../enums");
const paiementmethodentity_1 = require("./paiementmethodentity");
class BankPaiementMethodEntity extends paiementmethodentity_1.PaiementMethodEntity {
    constructor() {
        super(...arguments);
        this.type = enums_1.PaiementStrategyType.BANK;
    }
}
exports.BankPaiementMethodEntity = BankPaiementMethodEntity;
