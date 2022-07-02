"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paiementMethodBuilder = void 0;
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const enums_1 = require("../enums");
const bankpaiementmethodentity_1 = require("./bankpaiementmethodentity");
const mobilepaiementmethodentity_1 = require("./mobilepaiementmethodentity");
function paiementMethodBuilder(entity) {
    let method;
    switch (entity.type) {
        case enums_1.PaiementStrategyType.BANK:
            method = new bankpaiementmethodentity_1.BankPaiementMethodEntity(new EntityID_1.EntityID());
            break;
        case enums_1.PaiementStrategyType.MTN_MONEY:
        case enums_1.PaiementStrategyType.ORANGE_MONEY:
            method = new mobilepaiementmethodentity_1.MobilePaiementMethodEntity();
    }
    method.hydrate(entity);
    return method;
}
exports.paiementMethodBuilder = paiementMethodBuilder;
