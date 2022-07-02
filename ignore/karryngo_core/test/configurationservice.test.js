"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonFileConfigurationService_1 = require("../config/JsonFileConfigurationService");
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
var chai = require('chai');
describe('Test du service de configuration', () => {
    let jsonConfigFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
    let jsonConfig = jsonConfigFactory.getInstance();
    it('instanciation a partir du factory', () => {
        chai.expect(jsonConfig instanceof JsonFileConfigurationService_1.JsonFileConfigurationService).to.be.true;
    });
    it('test de l\'existance d\'une données ', () => {
        chai.expect(jsonConfig.keyExist('app_name')).to.be.true;
    });
    it('test de lecture d\'une donnés', () => {
        chai.expect(jsonConfig.getValueOf('app_name')).to.equal('Karryngo');
    });
    it('test de la génération d\'une erreur lorsque cles non existante', () => {
        chai.expect(() => jsonConfig.getValueOf('test')).to.throw();
    });
    it('test de la recuperation de la liste des cles', () => {
        chai.expect(jsonConfig.getKeysList()).to.be.a("array");
    });
    it('test de la recuperation du sous noeud de persistance', () => {
        chai.expect(jsonConfig.getValueOf('persistence').constructor).to.equal(({}).constructor);
    });
    it("test de la recuperation de l'hote de la base de données MongoDB", () => {
        chai.expect(jsonConfig.getValueOf('persistence').hostname).to.equal("localhost");
    });
});
