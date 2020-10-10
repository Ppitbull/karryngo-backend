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
exports.KarryngoRoutingException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
var KarryngoException_1 = require("./KarryngoException");
var KarryngoRoutingException = /** @class */ (function (_super) {
    __extends(KarryngoRoutingException, _super);
    function KarryngoRoutingException(code, description) {
        return _super.call(this, code, "Erreur de routage: " + description, description) || this;
    }
    KarryngoRoutingException.BAD_ROUTE_CONFIGURATION = -20;
    KarryngoRoutingException.ROUTE_NOT_FOUND = -19;
    KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND = -18;
    KarryngoRoutingException.ACTION_NOT_FOUND = -17;
    KarryngoRoutingException.METHOD_NOT_FOUND = -16;
    KarryngoRoutingException.MODULE_NOT_FOUND = -15;
    return KarryngoRoutingException;
}(KarryngoException_1.KarryngoException));
exports.KarryngoRoutingException = KarryngoRoutingException;
