"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResult = void 0;
/**
* @author Cedric nguendap
* @description Cette class represente le resultat d'une action et qui requiere des informations
*    sur le resultat
* @created 23/09/2020
* @modified by Cedric nguendap 19/10/2020
*/
class ActionResult {
    constructor(code = ActionResult.SUCCESS, message = "success", description = '', result = {}) {
        this.message = "";
        this.description = "";
        this.resultCode = 0;
        this.result = "";
        this.resultCode = code;
        this.message = message;
        this.description = description;
        this.result = result;
    }
}
exports.ActionResult = ActionResult;
ActionResult.RESSOURCE_NOT_FOUND_ERROR = -1;
ActionResult.NETWORK_ERROR = -2;
ActionResult.INVALID_ARGUMENT = -3;
ActionResult.UNKNOW_ERROR = -10;
ActionResult.SUCCESS = 0;
ActionResult.RESSOURCE_ALREADY_EXIST_ERROR = -4;
