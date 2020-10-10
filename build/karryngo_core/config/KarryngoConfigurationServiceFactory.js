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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoConfigurationServiceFactory = void 0;
var constants_1 = __importDefault(require("../../config-files/constants"));
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var DynamicLoader_1 = require("../utils/DynamicLoader");
var KarryngoConfigurationServiceFactory = /** @class */ (function (_super) {
    __extends(KarryngoConfigurationServiceFactory, _super);
    function KarryngoConfigurationServiceFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    KarryngoConfigurationServiceFactory.prototype.toString = function () {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationServiceFactory.prototype.hydrate = function (entity) {
        throw new Error("Method not implemented.");
    };
    /**
     * @description permet de creer une instance de l'unité de configuration. cette unité de configuration
     *  est configurer dans le fichier de configuration app.json
     * @return une implémentation de l'interface ConfigurablaApp
     */
    KarryngoConfigurationServiceFactory.prototype.getInstance = function () {
        return DynamicLoader_1.DynamicLoader.load(constants_1.default.class_for_configuration);
    };
    return KarryngoConfigurationServiceFactory;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.KarryngoConfigurationServiceFactory = KarryngoConfigurationServiceFactory;
