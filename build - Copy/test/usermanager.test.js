"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const injector_container_1 = require("../karryngo_core/lifecycle/injector_container");
const KarryngoPersistenceManagerFactory_1 = require("../karryngo_core/persistence/KarryngoPersistenceManagerFactory");
const ActionResult_1 = require("../karryngo_core/utils/ActionResult");
const User_1 = require("../karryngo_modules/services/usermanager/entities/User");
const usermanager_service_1 = require("../karryngo_modules/services/usermanager/usermanager.service");
var chai = require('chai');
injector_container_1.InjectorContainer.getInstance().bootstrap();
injector_container_1.InjectorContainer.getInstance().getInstanceOf(KarryngoPersistenceManagerFactory_1.KarryngoPersistenceManagerFactory).getInstance()
    .connect();
let manager = injector_container_1.InjectorContainer.getInstance().getInstanceOf(usermanager_service_1.UserManagerService);
describe('Test du service de gestion des utilisateurs', () => {
    it("Test de l'obtention de la liste des utilisateurs", () => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield manager.findAll();
        chai.expect(data.resultCode).to.equal(ActionResult_1.ActionResult.SUCCESS);
    }));
    it("Test de l'existance d'un user ayant un mail particuler", () => __awaiter(void 0, void 0, void 0, function* () {
        let user = new User_1.User();
        user.firstname = "ppitbull";
        user.lastname = "ppitbull";
        user.adresse.country = "Cameroun";
        user.adresse.email = "ppitbull016@gmail.com";
        user.adresse.mobilePhone = "+237 698 29 53 68";
        yield manager.newUser(user);
        let data = yield manager.findUserByEmail("ppitbull016@gmail.com");
        chai.expect(data.resultCode).to.equal(ActionResult_1.ActionResult.SUCCESS);
        chai.expect(data.result).to.be.a("array");
        chai.expect(data.result[0].adresse.email).to.be.equal("ppitbull016@gmail.com");
    }));
});
