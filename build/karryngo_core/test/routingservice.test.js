"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
const RouterService_1 = require("../routing/RouterService");
const express = __importStar(require("express"));
const routerchecker_1 = require("../routing/routerchecker");
const apiaccess_1 = require("../security/apiaccess");
var chai = require('chai');
describe('Test du service de routage', () => {
    let jsonConfigFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
    let router = new RouterService_1.RouterService(jsonConfigFactory.getInstance(), new routerchecker_1.RouterChecker(new apiaccess_1.ApiAccess()), express.Router());
    it("test de la liste des routes", () => {
        chai.expect(router.getRouteList()).to.be.a("array");
    });
    it("test de la contenance de l'url de test", () => {
        chai.expect(router.getRouteList()[0].url).to.equal("/api/truc");
    });
    it("test de la non existance d'un url: dois lancer une exception", () => {
        chai.expect(() => router.getRouteByUrl('/api/non_exist')).to.throw();
    });
    it("test de la contenance de la methode get dans l'url de test", () => {
        chai.expect(() => router.getRouteByUrl("/api/truc")).to.not.throw();
        chai.expect(router.getRouteByUrl("/api/truc").getMethodList()).to.contain("get");
    });
    it("test de la contenance de l'action associer a la methode get", () => {
        chai.expect(() => router.getRouteByUrl("/api/truc").getActionForMethod("get")).to.not.throw();
    });
    it("test de lancement d'instanciation et d'appel de fonction de la metode run", () => {
        router.run();
    });
});
;
