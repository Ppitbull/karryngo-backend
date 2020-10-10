"use strict";
/**
@author: Cedric nguendap
@description: Exception de base de l'application Karryngo
@created: 22/09/2020
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoException = void 0;
var KarryngoException = /** @class */ (function (_super) {
    __extends(KarryngoException, _super);
    /**
     * @constructor
     * @param code code de l'exception
     * @param message message de l'exception
     * @param description description de l'exception
     */
    function KarryngoException(code, message, description) {
        if (description === void 0) { description = ""; }
        var _this = _super.call(this, message.toString()) || this;
        _this._description = description;
        Error.captureStackTrace(_this, _this.constructor);
        _this.name = _this.constructor.name;
        return _this;
    }
    Object.defineProperty(KarryngoException.prototype, "description", {
        /**
         * @description permet de retourner la description de l'exception
         * @returns la description de l'exception
         */
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KarryngoException.prototype, "decription", {
        /**
         * @description permet d'affecter la description de l'exception
         * @param desc la description de l'exception
         */
        set: function (desc) {
            this._description = desc;
        },
        enumerable: false,
        configurable: true
    });
    return KarryngoException;
}(Error));
exports.KarryngoException = KarryngoException;
