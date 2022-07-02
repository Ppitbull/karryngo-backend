"use strict";
/**
@author Cedric nguendap
@description Cette classe represente un fournisseurs de service qui est sous le label d'une compagni
@created 13/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompagnyServiceProvider = void 0;
const companyservicerequester_1 = require("./companyservicerequester");
class CompagnyServiceProvider extends companyservicerequester_1.CompagnyServiceRequester {
    constructor() {
        super(...arguments);
        this.isAcceptedProvider = false;
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { isAcceptedProvider: this.isAcceptedProvider });
    }
}
exports.CompagnyServiceProvider = CompagnyServiceProvider;
