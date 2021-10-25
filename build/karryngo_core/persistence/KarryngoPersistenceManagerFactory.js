"use strict";
/**
@author Cedric nguendap
@description Cette classe est une classe abstraite et classe de base representant l'unite
    de persistance de type NoSQL (MongoDB, Firebase...)
@created 23/09/2020
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoPersistenceManagerFactory = void 0;
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
const core_decorator_1 = require("../decorator/core.decorator");
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
const DynamicLoader_1 = require("../utils/DynamicLoader");
let KarryngoPersistenceManagerFactory = class KarryngoPersistenceManagerFactory extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor(configServiceFactory) {
        super();
        this.configServiceFactory = configServiceFactory;
        this.persistance = DynamicLoader_1.DynamicLoader.load(this.configServiceFactory.getInstance().getValueOf('persistence').classe, [this.configServiceFactory.getInstance()]);
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method toString() not implemented.");
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        throw new Error("Method hydrate() not implemented.");
    }
    /**
     * @description permet d'obtenir l'instance de l'unité de persistace creer dans le constructeur. cette unité de persistance
     *  est configurer dans le fichier de configuration persistance.json
     * @return une implémentation de l'interface PersistenceManager
     */
    getInstance() {
        return this.persistance;
    }
};
KarryngoPersistenceManagerFactory = __decorate([
    core_decorator_1.KarryngoCore(),
    __metadata("design:paramtypes", [KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory])
], KarryngoPersistenceManagerFactory);
exports.KarryngoPersistenceManagerFactory = KarryngoPersistenceManagerFactory;
