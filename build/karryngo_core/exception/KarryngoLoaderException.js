"use strict";
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
exports.KarryngoLoaderException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié au chargment dynamique des modules de l'application de l'application
@see KarryngoException
@created: 22/09/2020
*/
var KarryngoException_1 = require("./KarryngoException");
var KarryngoLoaderException = /** @class */ (function (_super) {
    __extends(KarryngoLoaderException, _super);
    function KarryngoLoaderException(code, description) {
        return _super.call(this, code, "Erreur de chargement : " + description, description) || this;
    }
    KarryngoLoaderException.CLASS_NOT_FOUND = -10;
    KarryngoLoaderException.METHOD_NOT_FOUND = -9;
    return KarryngoLoaderException;
}(KarryngoException_1.KarryngoException));
exports.KarryngoLoaderException = KarryngoLoaderException;
