"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverColis = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
class ReceiverColis extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.name = "";
        this.contact = "";
        this.parttypesupplied = "";
    }
    /**
     * @inheritdoc
     */
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { name: this.name, contact: this.contact, parttypesupplied: this.parttypesupplied });
    }
}
exports.ReceiverColis = ReceiverColis;
