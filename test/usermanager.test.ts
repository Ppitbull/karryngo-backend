import * as assert from 'assert';
import { info } from 'console';
import { Controller, Service } from '../karryngo_core/decorator/dependecy_injector.decorator';
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
        
        //chai.expect(db instanceof MongooseDBManager).to.be.true;
        
        let data= await manager.findAll();
            //console.log("data is available");
            //data.result.map((user:User)=> console.log("user infos",user));
            chai.expect(data.resultCode).to.equal(ActionResult.SUCCESS);
    });   

    it("Test de l'existance d'un user ayant un mail particuler", async()=>
    {
        /*let user:User=new User();
        user.firstname="ppitbull";
        user.lastname="ppitbull";
        user.adresse.country="Cameroun";
        user.adresse.email="ppitbull016@gmail.com";
        user.adresse.mobilePhone="+237 698 29 53 68";
        await manager.newUser(user);*/
        manager.findUserByEmail("ppitbull016@gmail.com")
        .then((data)=> console.log(data))
        .catch((error)=> console.log(error));
    });
    
});