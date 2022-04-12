"use strict";
/**
@author: Cedric nguendap
@description: Exception de base de l'application Karryngo
@created: 22/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoException = void 0;
class KarryngoException extends Error {
    /**
     * @constructor
     * @param code code de l'exception
     * @param message message de l'exception
     * @param description description de l'exception
     */
    constructor(code, message, description = "") {
        super(message.toString());
        this._description = description;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }
    /**
     * @description permet de retourner la description de l'exception
     * @returns la description de l'exception
     */
    get description() {
        return this._description;
    }
    /**
     * @description permet d'affecter la description de l'exception
     * @param desc la description de l'exception
     */
    set decription(desc) {
        this._description = desc;
    }
}
exports.KarryngoException = KarryngoException;
