"use strict";
/*
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration
    de type JSON
@see KarryngoConfigurationService
@created: 21/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonFileConfigurationService = void 0;
const KarryngoConfigurationService_1 = require("./KarryngoConfigurationService");
class JsonFileConfigurationService extends KarryngoConfigurationService_1.KarryngoConfigurationService {
    /**
     *
     * @see KarryngoConfigurationService.encode()
     */
    encode(content) {
        return JSON.parse(content.toString());
    }
    /**
     *
     * @see KarryngoConfigurationService.decode()
     */
    decode(content) {
        return JSON.stringify(content);
    }
}
exports.JsonFileConfigurationService = JsonFileConfigurationService;
