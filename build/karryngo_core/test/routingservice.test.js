"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
var RouterService_1 = require("../routing/RouterService");
var express = __importStar(require("express"));
var chai = require('chai');
describe('Test du service de routage', function () {
    var jsonConfigFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
    var router = new RouterService_1.RouterService(jsonConfigFactory.getInstance(), express.Router);
    it("test de la liste des routes", function () {
        chai.expect(router.getRouteList()).to.be.a("array");
    });
    it("test de la contenance de l'url de test", function () {
        chai.expect(router.getRouteList()[0].url).to.equal("/api/truc");
    });
    it("test de la non existance d'un url: dois lancer une exception", function () {
        chai.expect(function () { return router.getRouteByUrl('/api/non_exist'); }).to.throw();
    });
    it("test de la contenance de la methode get dans l'url de test", function () {
        chai.expect(function () { return router.getRouteByUrl("/api/truc"); }).to.not.throw();
        chai.expect(router.getRouteByUrl("/api/truc").getMethodList()).to.contain("get");
    });
    it("test de la contenance de l'action associer a la methode get", function () {
        chai.expect(function () { return router.getRouteByUrl("/api/truc").getActionForMethod("get"); }).to.not.throw();
    });
});
