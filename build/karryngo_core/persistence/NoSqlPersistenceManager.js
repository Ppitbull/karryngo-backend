"use strict";
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlPersistenceManager = void 0;
const AbstractPersistenceManager_1 = require("./AbstractPersistenceManager");
class NoSqlPersistenceManager extends AbstractPersistenceManager_1.AbstractPersistenceManager {
    constructor(config) {
        super();
        this.configService = config;
    }
    getUrlEntity(entity) {
        let urlEntity = "";
        return urlEntity;
    }
}
exports.NoSqlPersistenceManager = NoSqlPersistenceManager;
//# sourceMappingURL=NoSqlPersistenceManager.js.map