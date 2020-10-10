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
exports.UserManagerService = void 0;
var karryngo_service_1 = require("../../karryngo.service");
var UserManagerService = /** @class */ (function (_super) {
    __extends(UserManagerService, _super);
    function UserManagerService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserManagerService.prototype.newUser = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    UserManagerService.prototype.findUserByEmail = function (email) {
        return new Promise(function (resolve, reject) {
        });
    };
    UserManagerService.prototype.findUserById = function (id) {
        return new Promise(function (resolve, reject) {
        });
    };
    UserManagerService.prototype.saveUser = function (user) {
        return new Promise(function (resolve, reject) {
        });
    };
    return UserManagerService;
}(karryngo_service_1.KarryngoService));
exports.UserManagerService = UserManagerService;
