"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KFileStorage = void 0;
const KarryngoFileStorageFactory_1 = require("../fs/KarryngoFileStorageFactory");
const injector_container_1 = require("../lifecycle/injector_container");
function KFileStorage() {
    return (target, property) => {
        target[property] = injector_container_1.InjectorContainer.getInstance()
            .getInstanceOf(KarryngoFileStorageFactory_1.KarryngoFileStorageFactory)
            .getInstance();
        ;
    };
}
exports.KFileStorage = KFileStorage;
