"use strict";
/**
@author Cedric nguendap
@description Cette classe est une classe abstraite qui represente un client de la plateforme
@created 13/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const User_1 = require("../../../services/usermanager/entities/User");
const wallet_1 = require("../../../services/payment/entities/wallet");
const paiementmethodbuilder_1 = require("../../../services/payment/entities/paiementmethodbuilder");
const history_1 = require("../../../services/historique/history");
const account_type_enum_1 = require("../../../services/usermanager/entities/account-type.enum");
class Customer extends User_1.User {
    constructor() {
        super(...arguments);
        this.passportNumber = "";
        this.isProvider = false;
        this.isCompany = false;
        this.paimentMethodList = [];
        this.wallet = new wallet_1.Wallet(new EntityID_1.EntityID());
        this.histories = [];
        this.accountType = account_type_enum_1.AccountType.CUSTOMER_ACCOUNT;
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "wallet")
                this.wallet.hydrate(entity[key]);
            else if (key == "address")
                this.adresse.hydrate(entity[key]);
            else if (key == "paimentMethodList")
                this.paimentMethodList = entity[key].map((paiementMethod) => (0, paiementmethodbuilder_1.paiementMethodBuilder)(paiementMethod));
            else if (key == "histories")
                this.histories = entity[key].map((history) => {
                    let histo = new history_1.UserHistory();
                    histo.hydrate(history);
                    return histo;
                });
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { isProvider: this.isProvider, passportNumber: this.passportNumber, isCompany: this.isCompany, wallet: this.wallet.toString(), paimentMethodList: this.paimentMethodList.map((method) => method.toString()), accountType: this.accountType });
    }
}
exports.Customer = Customer;
