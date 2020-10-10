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
exports.JsonFileConfigurationService = void 0;
/**
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration
    de type JSON
@see KarryngoConfigurationService
@created: 21/09/2020
*/
var ConfigurationException_1 = require("../exception/ConfigurationException");
var KarryngoConfigurationService_1 = require("./KarryngoConfigurationService");
var JsonFileConfigurationService = /** @class */ (function (_super) {
    __extends(JsonFileConfigurationService, _super);
    function JsonFileConfigurationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    JsonFileConfigurationService.prototype.encode = function (content) {
        var result;
        try {
            result = JSON.parse(content.toString());
        }
        catch (error) {
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.PARSE_FILE, "error when encoding to JSON. content: " + content);
        }
        return result;
    };
    /**
     * @inheritdoc
     */
    JsonFileConfigurationService.prototype.decode = function (content) {
        var result;
        try {
            result = JSON.stringify(content);
        }
        catch (error) {
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.PARSE_FILE, "error when decoding from JSON. content: " + content);
        }
        return result;
    };
    return JsonFileConfigurationService;
}(KarryngoConfigurationService_1.KarryngoConfigurationService));
exports.JsonFileConfigurationService = JsonFileConfigurationService;
