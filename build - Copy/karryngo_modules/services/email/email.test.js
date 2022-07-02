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
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const email_service_1 = require("./email.service");
const email_1 = require("./entities/email");
const usermanager_service_1 = require("../usermanager/usermanager.service");
var chai = require('chai');
describe('Test du service de mail', () => __awaiter(void 0, void 0, void 0, function* () {
    var crud;
    var user = new usermanager_service_1.UserManagerService(crud);
    let emailService = new email_service_1.EmailService(user);
    it("test de l'envoi d'un mail", (done) => __awaiter(void 0, void 0, void 0, function* () {
        let email = new email_1.Email().from('contact.karryngo@gmail.com')
            .to("cednguendap@gmail.com")
            .title("Test de fonctionnement2 et la")
            .textContent('Test d\'envoi de mail par nodemailer');
        let emailCon = yield emailService.send(email);
        chai.expect(emailCon.resultCode).to.equal(ActionResult_1.ActionResult.SUCCESS);
        done();
    }));
}));
