import * as assert from 'assert';
import { User } from '../../karryngo_modules/services/usermanager/entities/User';
import { JsonFileConfigurationService } from '../config/JsonFileConfigurationService';
import { KarryngoConfigurationServiceFactory } from '../config/KarryngoConfigurationServiceFactory';
import { KarryngoPersistenceManagerFactory } from '../persistence/KarryngoPersistenceManagerFactory';
import { MongooseDBManager } from '../persistence/MongooseDBManager';
import { ActionResult } from '../utils/ActionResult';
import { DynamicLoader } from '../utils/DynamicLoader';

var chai=require('chai');

describe('Test du service de Persistance',()=>
{
    let jsonConfigFactory=new KarryngoConfigurationServiceFactory();
    let jsonConfig=jsonConfigFactory.getInstance();
    let persistenceFactory=new KarryngoPersistenceManagerFactory(jsonConfig)
    let db=persistenceFactory.getInstance();

    it("Test d'instanciation de la classe de persistence",()=>
    {
        chai.expect(db instanceof MongooseDBManager).to.be.true;
    });

    it("test de connexion a mongodb",async ()=>{
        let con=await db.connect();
        chai.expect(con.resultCode).to.equal(ActionResult.SUCCESS);  
    });

    it("test de creation d'un compte utilisateur",async()=>
    {
        let user:User=new User();
        user.firstName="Cedric";
        user.lastName="Nguendap";

        let res=await db.create(user);
        
        //console.log('created action ', res);
        
        db.getQueryBuilder(user).find().then((data:any)=>
        {
            console.log("created user ",data);
        }).catch((e:any)=>console.error(e));

        //console.log("manager test ", );
        chai.expect(res.resultCode).to.equal(ActionResult.SUCCESS);
    });    
    
});