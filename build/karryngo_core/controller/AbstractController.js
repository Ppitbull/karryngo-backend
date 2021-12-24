"use strict";
/**
@author: Cedric nguendap
@description: classe  est une classe abstraite. c'est la classe de base de tous les controller
@created: 23/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
class AbstractController extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    /**
     * @constructor
     * @description constructeur ou est injecté les objets de persistance ete de configuration
     * @param persistence outils de persistance
     * @param config outils de configuration
     */
    constructor(persistence, config) {
        super();
        this.configService = config;
        this.persistenceManager = persistence;
    }
}
exports.AbstractController = AbstractController;
//# sourceMappingURL=AbstractController.js.map