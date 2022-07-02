"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBPersistence = void 0;
const injector_container_1 = require("../lifecycle/injector_container");
const KarryngoPersistenceManagerFactory_1 = require("../persistence/KarryngoPersistenceManagerFactory");
function DBPersistence() {
    return (target, property) => {
        target[property] = injector_container_1.InjectorContainer.getInstance()
            .getInstanceOf(KarryngoPersistenceManagerFactory_1.KarryngoPersistenceManagerFactory)
            .getInstance();
        ;
    };
}
exports.DBPersistence = DBPersistence;
