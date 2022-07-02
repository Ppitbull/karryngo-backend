"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
const injector_container_1 = require("../lifecycle/injector_container");
function ConfigService() {
    return (target, property) => {
        target[property] = injector_container_1.InjectorContainer.getInstance()
            .getInstanceOf(KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory)
            .getInstance();
        ;
    };
}
exports.ConfigService = ConfigService;
