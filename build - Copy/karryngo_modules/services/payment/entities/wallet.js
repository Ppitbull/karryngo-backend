"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
class Wallet extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(data) {
        super();
        this.amount = 0;
        this.id = data._id;
        this.amount = data.amount;
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { amount: this.amount });
    }
    increase(amount) {
        if (amount < 0)
            return false;
        this.amount += amount;
        return true;
    }
    decrease(amount) {
        if (amount < 0 || amount > this.amount)
            return false;
        this.amount -= amount;
        return true;
    }
}
exports.Wallet = Wallet;
