import * as assert from 'assert';
import { Location } from '../../karryngo_modules/services/geolocalisation/entities/location';
import { User } from '../../karryngo_modules/services/usermanager/entities/User';
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
    let persistenceFactory=new KarryngoPersistenceManagerFactory(jsonConfigFactory);
    let db=persistenceFactory.getInstance();

    let user:User=new User();
    user.firstname="Cedric";
    user.lastname="Nguendap Joel Cedric";
    
    let pos:Location=new Location();
    pos.name="Yaoundé";
    pos.longitude=12.5;
    pos.latitude=158.22142;
    //let m=new MongooseDBManager(jsonConfig);
    //console.log("shema ",m.createShema(user));


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
        let res=await db.create(user);
        
        //console.log('created action ', res);
        
        db.getQueryBuilder(user).find().then((data:any)=>
        {
            console.log("created user ",data);
        }).catch((e:any)=>console.error(e));
       

        //console.log("manager test ", );
        //chai.expect(res.resultCode).to.equal(ActionResult.SUCCESS);
    });    
    
});