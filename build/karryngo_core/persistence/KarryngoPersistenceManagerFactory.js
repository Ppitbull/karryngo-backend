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
exports.KarryngoPersistenceManagerFactory = void 0;
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var DynamicLoader_1 = require("../utils/DynamicLoader");
var KarryngoPersistenceManagerFactory = /** @class */ (function (_super) {
    __extends(KarryngoPersistenceManagerFactory, _super);
    function KarryngoPersistenceManagerFactory(config) {
        var _this = _super.call(this) || this;
        _this.configService = config;
        return _this;
    }
    /**
     * @inheritdoc
     */
    KarryngoPersistenceManagerFactory.prototype.toString = function () {
        throw new Error("Method toString() not implemented.");
    };
    /**
     * @inheritdoc
     */
    KarryngoPersistenceManagerFactory.prototype.hydrate = function (entity) {
        throw new Error("Method hydrate() not implemented.");
    };
    /**
     * @description permet de creer une instance de l'unité de persistace. cette unité de persistance
     *  est configurer dans le fichier de configuration persistance.json
     * @return une implémentation de l'interface PersistenceManager
     */
    KarryngoPersistenceManagerFactory.prototype.getInstance = function () {
        return DynamicLoader_1.DynamicLoader.load(this.configService.getValueOf('persistence').classe, [this.configService]);
    };
    return KarryngoPersistenceManagerFactory;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.KarryngoPersistenceManagerFactory = KarryngoPersistenceManagerFactory;
