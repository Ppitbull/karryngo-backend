"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaiementMethodEntity = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
class PaiementMethodEntity extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.moneyCode = "XAF"; //doit être changé a l'avenir
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { moneyCode: this.moneyCode, type: this.type });
    }
    hydrate(entity) {
        super.hydrate(entity);
        this.moneyCode = this.purgeAttribute(entity, "moneyCode");
        this.type = this.purgeAttribute(entity, "type");
    }
}
exports.PaiementMethodEntity = PaiementMethodEntity;
