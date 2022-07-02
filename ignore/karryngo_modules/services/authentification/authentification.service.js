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
exports.AuthentificationService = void 0;
var karryngo_service_1 = require("../../karryngo.service");
var AuthentificationService = /** @class */ (function (_super) {
    __extends(AuthentificationService, _super);
    function AuthentificationService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AuthentificationService.prototype.register = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    AuthentificationService.prototype.login = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    AuthentificationService.prototype.forgotPassword = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    AuthentificationService.prototype.verifyEmail = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    return AuthentificationService;
}(karryngo_service_1.KarryngoService));
exports.AuthentificationService = AuthentificationService;
