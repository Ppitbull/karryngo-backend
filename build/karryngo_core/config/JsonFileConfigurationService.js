"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileConfigurationService = void 0;
/**
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration
    de type JSON
@see KarryngoConfigurationService
@created: 21/09/2020
*/
const ConfigurationException_1 = require("../exception/ConfigurationException");
const KarryngoConfigurationService_1 = require("./KarryngoConfigurationService");
class JsonFileConfigurationService extends KarryngoConfigurationService_1.KarryngoConfigurationService {
    /**
     * @inheritdoc
     */
    encode(content) {
        let result;
        try {
            result = JSON.parse(content.toString());
        }
        catch (error) {
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.PARSE_FILE, "error when encoding to JSON. content: " + content);
        }
        return result;
    }
    /**
     * @inheritdoc
     */
    decode(content) {
        let result;
        try {
            result = JSON.stringify(content);
        }
        catch (error) {
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.PARSE_FILE, "error when decoding from JSON. content: " + content);
        }
        return result;
    }
}
exports.JsonFileConfigurationService = JsonFileConfigurationService;
