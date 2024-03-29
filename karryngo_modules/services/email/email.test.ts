import * as assert from 'assert';
import * as express from 'express';
import { ActionResult } from '../../../karryngo_core/utils/ActionResult';
import { EmailService } from './email.service';
import { Email } from './entities/email';
var chai=require('chai');

describe('Test du service de mail',async ()=>
{
    let emailService:EmailService=new EmailService();
    it("test de l'envoi d'un mail", async (done)=>
    {
        let email:Email=new Email().from('contact.karryngo@gmail.com')
        .to("cednguendap@gmail.com")
        .title("Test de fonctionnement2 et la")
        .textContent('Test d\'envoi de mail par nodemailer');

        let emailCon=await emailService.send(email);
        chai.expect(emailCon.resultCode).to.equal(ActionResult.SUCCESS);  
        done()
    });  
   
});