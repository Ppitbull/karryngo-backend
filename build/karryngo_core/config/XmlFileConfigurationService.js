"use strict";
/**
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration
    de type Xml
@see KarryngoConfigurationService
@created: 21/09/2020
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
exports.XmlFileConfigurationService = void 0;
var KarryngoConfigurationService_1 = require("./KarryngoConfigurationService");
var XmlFileConfigurationService = /** @class */ (function (_super) {
    __extends(XmlFileConfigurationService, _super);
    function XmlFileConfigurationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    XmlFileConfigurationService.prototype.encode = function (content) {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    XmlFileConfigurationService.prototype.decode = function (content) {
        throw new Error("Method not implemented.");
    };
    return XmlFileConfigurationService;
}(KarryngoConfigurationService_1.KarryngoConfigurationService));
exports.XmlFileConfigurationService = XmlFileConfigurationService;
