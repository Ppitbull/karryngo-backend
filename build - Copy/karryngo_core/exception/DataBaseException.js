"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a l'accés et la manipulation de la bd
@see KarryngoException
@created: 22/09/2020
*/
const KarryngoException_1 = require("./KarryngoException");
class DataBaseException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Erreur de communication avec la bd: " + description, description);
    }
}
exports.DataBaseException = DataBaseException;
DataBaseException.DATABAE_DISCONNECTED = -60;
DataBaseException.DATABASE_UNKNOW_ERROR = -59;
