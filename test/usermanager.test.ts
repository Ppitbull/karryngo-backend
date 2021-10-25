import * as assert from 'assert';
import { info } from 'console';
import { InjectorContainer } from '../karryngo_core/lifecycle/injector_container';
import { KarryngoPersistenceManagerFactory } from '../karryngo_core/persistence/KarryngoPersistenceManagerFactory';
import { ActionResult } from '../karryngo_core/utils/ActionResult';
import { User } from '../karryngo_modules/services/usermanager/entities/User';
import { UserManagerService } from '../karryngo_modules/services/usermanager/usermanager.service';


var chai=require('chai');
InjectorContainer.getInstance().bootstrap();
InjectorContainer.getInstance().getInstanceOf<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory).getInstance()
            .connect();
let manager:UserManagerService=InjectorContainer.getInstance().getInstanceOf<UserManagerService>(UserManagerService);

describe('Test du service de gestion des utilisateurs',()=>
{
    it("Test de l'obtention de la liste des utilisateurs",async()=>
    {            
        let data= await manager.findAll();
        chai.expect(data.resultCode).to.equal(ActionResult.SUCCESS);
    });   

    it("Test de l'existance d'un user ayant un mail particuler", async()=>
    {
        let user:User=new User();
        user.firstname="ppitbull";
        user.lastname="ppitbull";
        user.adresse.country="Cameroun";
        user.adresse.email="ppitbull016@gmail.com";
        user.adresse.mobilePhone="+237 698 29 53 68";
        await manager.newUser(user);
        let data=await manager.findUserByEmail("ppitbull016@gmail.com");
        chai.expect(data.resultCode).to.equal(ActionResult.SUCCESS);
        chai.expect(data.result).to.be.a("array");
        chai.expect(data.result[0].adresse.email).to.be.equal("ppitbull016@gmail.com");
    });
    
});