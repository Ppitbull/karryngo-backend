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
exports.MongoDBManager = void 0;
/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/
var NoSqlPersistenceManager_1 = require("./NoSqlPersistenceManager");
var MongoDBManager = /** @class */ (function (_super) {
    __extends(MongoDBManager, _super);
    function MongoDBManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.getQueryBuilder = function (entity) {
        throw new Error("Method getQueryBuilder() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.connect = function () {
        throw new Error("Method connect() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.create = function (entity) {
        throw new Error("Method create() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.update = function (entity) {
        throw new Error("Method update() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.delete = function (entity) {
        throw new Error("Method delete() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.toString = function () {
        throw new Error("Method toString() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.hydrate = function (entity) {
        throw new Error("Method hydrate() not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongoDBManager.prototype.createShema = function (entity) {
        throw new Error("Method createShema() not implemented.");
    };
    return MongoDBManager;
}(NoSqlPersistenceManager_1.NoSqlPersistenceManager));
exports.MongoDBManager = MongoDBManager;
