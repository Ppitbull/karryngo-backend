"use strict";
/**
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration
    de type Xml
@see KarryngoConfigurationService
@created: 21/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlFileConfigurationService = void 0;
const KarryngoConfigurationService_1 = require("./KarryngoConfigurationService");
class XmlFileConfigurationService extends KarryngoConfigurationService_1.KarryngoConfigurationService {
    /**
     * @inheritdoc
     */
    encode(content) {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    decode(content) {
        throw new Error("Method not implemented.");
    }
}
exports.XmlFileConfigurationService = XmlFileConfigurationService;
//# sourceMappingURL=XmlFileConfigurationService.js.map