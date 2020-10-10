"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionResult = void 0;
/**
* @author: Cedric nguendap
* @description: Cette class represente le resultat d'une action et qui requiere des informations
*    sur le resultat
* @created: 23/09/2020
*/
var ActionResult = /** @class */ (function () {
    function ActionResult(code, message, description, result) {
        if (code === void 0) { code = ActionResult.SUCCESS; }
        if (message === void 0) { message = "success"; }
        if (description === void 0) { description = ''; }
        if (result === void 0) { result = {}; }
        this._message = "";
        this._description = "";
        this._resultCode = 0;
        this._result = "";
        this.resultCode = code;
        this.message = message;
        this.description = description;
        this.result = result;
    }
    Object.defineProperty(ActionResult.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (mes) {
            this._message = mes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionResult.prototype, "description", {
        get: function () {
            return this._description;
        },
        set: function (desc) {
            this._description = desc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionResult.prototype, "resultCode", {
        get: function () {
            return this._resultCode;
        },
        set: function (code) {
            this._resultCode = code;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ActionResult.prototype, "result", {
        get: function () {
            return this._result;
        },
        set: function (res) {
            this._result = res;
        },
        enumerable: false,
        configurable: true
    });
    ActionResult.RESSOURCE_NOT_FOUND_ERROR = -1;
    ActionResult.NETWORK_ERROR = -2;
    ActionResult.UNKNOW_ERROR = -10;
    ActionResult.SUCCESS = 0;
    return ActionResult;
}());
exports.ActionResult = ActionResult;
