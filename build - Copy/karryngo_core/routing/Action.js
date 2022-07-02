"use strict";
/**
@author Cedric nguendap
@description Cette classe présente une action fait par l'utilisateur a partir
    d'une url
@created 18/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
class Action extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor(method = "", action = "", params = {}, secure = true) {
        super();
        this.method = "";
        this.params = {};
        this.action = "";
        this.secure = true;
        this.action = action;
        this.method = method;
        this.params = params;
        this.secure = secure;
    }
    isSecure() {
        return this.secure;
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
}
exports.Action = Action;
