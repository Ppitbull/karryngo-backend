"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonFileConfigurationService_1 = require("../config/JsonFileConfigurationService");
var KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
var chai = require('chai');
describe('Test du service de configuration', function () {
    var jsonConfigFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
    var jsonConfig = jsonConfigFactory.getInstance();
    it('instanciation a partir du factory', function () {
        chai.expect(jsonConfig instanceof JsonFileConfigurationService_1.JsonFileConfigurationService).to.be.true;
    });
    it('test de l\'existance d\'une données ', function () {
        chai.expect(jsonConfig.keyExist('app_name')).to.be.true;
    });
    it('test de lecture d\'une donnés', function () {
        chai.expect(jsonConfig.getValueOf('app_name')).to.equal('Karryngo');
    });
    it('test de la génération d\'une erreur lorsque cles non existante', function () {
        chai.expect(function () { return jsonConfig.getValueOf('test'); }).to.throw();
    });
    it('test de la recuperation de la liste des cles', function () {
        chai.expect(jsonConfig.getKeysList()).to.be.a("array");
    });
    it('test de la recuperation du sous noeud de persistance', function () {
        chai.expect(jsonConfig.getValueOf('persistence').constructor).to.equal(({}).constructor);
    });
    it("test de la recuperation de l'hote de la base de données MongoDB", function () {
        chai.expect(jsonConfig.getValueOf('persistence').hostname).to.equal("localhost");
    });
});
