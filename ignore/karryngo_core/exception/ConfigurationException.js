"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
const KarryngoException_1 = require("./KarryngoException");
class ConfigurationException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Erreur de configuration " + description, description);
    }
}
exports.ConfigurationException = ConfigurationException;
ConfigurationException.PARSE_FILE = -100;
ConfigurationException.ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT = -99;
ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND = -98;
ConfigurationException.CLASS_CONFIGURATION_NOT_FOUND = 97;
