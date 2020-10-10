"use strict";
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite
    de persistance de type NoSQL (MongoDB, Firebase...)
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
exports.NoSqlPersistenceManager = void 0;
var AbstractPersistenceManager_1 = require("./AbstractPersistenceManager");
var NoSqlPersistenceManager = /** @class */ (function (_super) {
    __extends(NoSqlPersistenceManager, _super);
    function NoSqlPersistenceManager(config) {
        var _this = _super.call(this) || this;
        _this.configService = config;
        return _this;
    }
    NoSqlPersistenceManager.prototype.getUrlEntity = function (entity) {
        var urlEntity = "";
        return urlEntity;
    };
    return NoSqlPersistenceManager;
}(AbstractPersistenceManager_1.AbstractPersistenceManager));
exports.NoSqlPersistenceManager = NoSqlPersistenceManager;
