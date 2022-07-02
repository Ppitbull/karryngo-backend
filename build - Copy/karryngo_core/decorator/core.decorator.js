"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = exports.Service = exports.KarryngoCore = void 0;
const injector_container_1 = require("../lifecycle/injector_container");
function KarryngoCore() {
    return (target) => {
        //obtention de l'instance du containeur d'injection
        const injector = injector_container_1.InjectorContainer.getInstance();
        //resolution et  sauvegarde des dépendances
        injector.resolveAndSave(target);
    };
}
exports.KarryngoCore = KarryngoCore;
/**
 * @description Cette fonction est un décorateur permetant de gérer les dépendance
 *  en tant que service.
 * @return function qui définis le comportement l'ors de l'appel du décorateur @Service
 */
function Service() {
    return (target) => {
        //obtention de l'instance du containeur d'injection
        const injector = injector_container_1.InjectorContainer.getInstance();
        //resolution et  sauvegarde des dépendances
        injector.resolveAndSave(target);
    };
}
exports.Service = Service;
/**
 * @description Cette fonction est un décorateur permetant de gérer les dépendance
 *  en tant que controlleur.
 * @return function qui définis le comportement l'ors de l'appel du décorateur @Controller
 */
function Controller() {
    return (target) => {
        //obtention de l'instance du containeur d'injection
        const injector = injector_container_1.InjectorContainer.getInstance();
        //resolution des dépendances
        injector.resolve(target);
    };
}
exports.Controller = Controller;
