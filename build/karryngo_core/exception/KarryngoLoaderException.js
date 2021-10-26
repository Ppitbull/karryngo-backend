"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoLoaderException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié au chargment dynamique des modules de l'application de l'application
@see KarryngoException
@created: 22/09/2020
*/
const KarryngoException_1 = require("./KarryngoException");
class KarryngoLoaderException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Erreur de chargement : " + description, description);
    }
}
exports.KarryngoLoaderException = KarryngoLoaderException;
KarryngoLoaderException.CLASS_NOT_FOUND = -30;
KarryngoLoaderException.METHOD_NOT_FOUND = -29;
//# sourceMappingURL=KarryngoLoaderException.js.map