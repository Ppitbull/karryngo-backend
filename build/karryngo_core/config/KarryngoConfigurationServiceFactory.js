"use strict";
/**
@author: Cedric nguendap
@description: Cette classe est une classe fabrique permettant de fabriquer l'unité
    de configuration (json, xml,...)
@created: 23/09/2020
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoConfigurationServiceFactory = void 0;
const constants_1 = __importDefault(require("../../config-files/constants"));
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
const DynamicLoader_1 = require("../utils/DynamicLoader");
class KarryngoConfigurationServiceFactory extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor() {
        super();
        this.configService = DynamicLoader_1.DynamicLoader.load(constants_1.default.class_for_configuration);
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
    /**
     * @description permet d'obtenir l'instance de l'unité de configuration créer dans le constructeur
     *   cette unité de configuration est configurer dans le fichier de configuration app.json
     * @return une implémentation de l'interface ConfigurablaApp
     */
    getInstance() {
        return this.configService;
    }
}
exports.KarryngoConfigurationServiceFactory = KarryngoConfigurationServiceFactory;
//# sourceMappingURL=KarryngoConfigurationServiceFactory.js.map