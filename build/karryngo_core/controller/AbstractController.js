"use strict";
/**
@author: Cedric nguendap
@description: classe  est une classe abstraite. c'est la classe de base de tous les controller
@created: 23/09/2020
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractController = void 0;
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var AbstractController = /** @class */ (function (_super) {
    __extends(AbstractController, _super);
    /**
     * @constructor
     * @description constructeur ou est injecté les objets de persistance ete de configuration
     * @param persistence outils de persistance
     * @param config outils de configuration
     */
    function AbstractController(persistence, config) {
        var _this = _super.call(this) || this;
        _this.configService = config;
        _this.persistenceManager = persistence;
        return _this;
    }
    return AbstractController;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.AbstractController = AbstractController;
