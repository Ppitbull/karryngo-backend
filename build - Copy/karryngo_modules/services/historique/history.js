"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHistory = void 0;
const KarryngoPersistentEntity_1 = require("../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const financialtransaction_1 = require("../payment/entities/financialtransaction");
class UserHistory extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.financialTransaction = new financialtransaction_1.FinancialTransaction(new EntityID_1.EntityID());
        this.serviceTransportID = new EntityID_1.EntityID();
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "financialTransaction")
                this.financialTransaction.hydrate(entity[key]);
            else if (key == "serviceTransportID")
                this.serviceTransportID.setId(entity[key]);
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { financialTransaction: this.financialTransaction.toString(), serviceTransportID: this.serviceTransportID.toString() });
    }
}
exports.UserHistory = UserHistory;
