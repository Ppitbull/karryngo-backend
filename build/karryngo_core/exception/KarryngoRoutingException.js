"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoRoutingException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
const KarryngoException_1 = require("./KarryngoException");
class KarryngoRoutingException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Erreur de routage: " + description, description);
    }
}
exports.KarryngoRoutingException = KarryngoRoutingException;
KarryngoRoutingException.BAD_ROUTE_CONFIGURATION = -20;
KarryngoRoutingException.ROUTE_NOT_FOUND = -19;
KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND = -18;
KarryngoRoutingException.ACTION_NOT_FOUND = -17;
KarryngoRoutingException.METHOD_NOT_FOUND = -16;
KarryngoRoutingException.MODULE_NOT_FOUND = -15;
