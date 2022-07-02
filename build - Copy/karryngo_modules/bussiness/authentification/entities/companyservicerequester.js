"use strict";
/**
@author Cedric nguendap
@description Cette classe represente un demandeur de service qui est sous le label d'une compagni
@created 13/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompagnyServiceRequester = void 0;
const serviceprovider_1 = require("./serviceprovider");
class CompagnyServiceRequester extends serviceprovider_1.ServiceProvider {
    constructor() {
        super(...arguments);
        this.companyName = "";
        this.registrationNumber = "";
        this.importExportCompagnyCode = "";
        this.companyAddress = "";
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { companyName: this.companyName, registrationNumber: this.registrationNumber, importExportCompagnyCode: this.importExportCompagnyCode, companyAddress: this.companyAddress });
    }
}
exports.CompagnyServiceRequester = CompagnyServiceRequester;
