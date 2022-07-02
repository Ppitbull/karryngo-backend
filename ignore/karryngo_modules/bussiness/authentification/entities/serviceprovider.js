"use strict";
/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service
@created 13/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const servicerequester_1 = require("./servicerequester");
class ServiceProvider extends servicerequester_1.ServiceRequester {
    constructor() {
        super(...arguments);
        this.adressForVerification = [];
        this.isAcceptedProvider = false;
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "address")
                this.adresse.hydrate(entity[key]);
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { isAcceptedProvider: this.isAcceptedProvider });
    }
}
exports.ServiceProvider = ServiceProvider;
