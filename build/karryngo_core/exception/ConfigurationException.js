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
exports.ConfigurationException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
var KarryngoException_1 = require("./KarryngoException");
var ConfigurationException = /** @class */ (function (_super) {
    __extends(ConfigurationException, _super);
    function ConfigurationException(code, description) {
        return _super.call(this, code, "Erreur de configuration", description) || this;
    }
    ConfigurationException.PARSE_FILE = -100;
    ConfigurationException.ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT = -99;
    ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND = -98;
    ConfigurationException.CLASS_CONFIGURATION_NOT_FOUND = 97;
    return ConfigurationException;
}(KarryngoException_1.KarryngoException));
exports.ConfigurationException = ConfigurationException;
