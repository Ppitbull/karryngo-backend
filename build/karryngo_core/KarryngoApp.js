"use strict";
/**
@author: Cedric nguendap
@description: Cette classe est la classe permetant de lancer l'application
@created: 23/09/2020
@version 1.0.0
*/
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoApp = void 0;
var KarryngoApplicationEntity_1 = require("./KarryngoApplicationEntity");
var KarryngoConfigurationServiceFactory_1 = require("./config/KarryngoConfigurationServiceFactory");
var KarryngoPersistenceManagerFactory_1 = require("./persistence/KarryngoPersistenceManagerFactory");
var RouterService_1 = require("./routing/RouterService");
var express = __importStar(require("express"));
var KarryngoApp = /** @class */ (function (_super) {
    __extends(KarryngoApp, _super);
    function KarryngoApp() {
        var _this = _super.call(this) || this;
        //instanciation du factory du service de configuration
        _this.configurationServiceFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
        //obtention de l'instance du service de configuration a partir du factory
        var configurationServiceIntance = _this.configurationServiceFactory.getInstance();
        //obtention de l'instance du factory de persistance avec injection de service de configuration
        _this.persistanceManagerFactory = new KarryngoPersistenceManagerFactory_1.KarryngoPersistenceManagerFactory(configurationServiceIntance);
        //obtention de l'instance du service de persistance
        _this.persistenceManagerInstance = _this.persistanceManagerFactory.getInstance();
        //obtention de l'instance du service de routage avec injection du service de routing
        //offerte par le framework Express et du service de configuration
        _this.routerService = new RouterService_1.RouterService(configurationServiceIntance, express.Router);
        return _this;
    }
    /**
     * @description Cette fonction permet de coordonner les étapes nécessaires a la reponse de
     *  de la requetes envoyé par l'utilisateur.
     *  voir le design partern Injection des dépendances (Inversion de contrôle IoC)
     */
    KarryngoApp.prototype.run = function () {
        //execution du service de routage
        this.routerService.run(this.persistenceManagerInstance);
    };
    /**
     * @inheritdoc
     */
    KarryngoApp.prototype.toString = function () {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    KarryngoApp.prototype.hydrate = function (entity) {
        throw new Error("Method not implemented.");
    };
    return KarryngoApp;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.KarryngoApp = KarryngoApp;
