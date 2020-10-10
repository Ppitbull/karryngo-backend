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
exports.DataBaseException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a l'accés et la manipulation de la bd
@see KarryngoException
@created: 22/09/2020
*/
var KarryngoException_1 = require("./KarryngoException");
var DataBaseException = /** @class */ (function (_super) {
    __extends(DataBaseException, _super);
    function DataBaseException(code, description) {
        return _super.call(this, code, "Erreur de communication avec la bd: " + description, description) || this;
    }
    DataBaseException.DATABAE_DISCONNECTED = -60;
    return DataBaseException;
}(KarryngoException_1.KarryngoException));
exports.DataBaseException = DataBaseException;
