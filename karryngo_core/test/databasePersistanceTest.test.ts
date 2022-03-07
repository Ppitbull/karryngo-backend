import * as assert from 'assert';
import { Location } from '../../karryngo_modules/services/geolocalisation/entities/location';
import { Address } from '../../karryngo_modules/services/usermanager/entities/Address';
import { User } from '../../karryngo_modules/services/usermanager/entities/User';
import { KarryngoConfigurationServiceFactory } from '../config/KarryngoConfigurationServiceFactory';
import { KarryngoPersistenceManagerFactory } from '../persistence/KarryngoPersistenceManagerFactory';
import { MongoDBManager } from '../persistence/MongoDBManager';
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
    user.firstname="Sanou Kue";
    user.lastname="Flambel Junion";
    
    let pos1:Location=new Location();
    pos1.name="Villageois bar, Bangangté";
    pos1.longitude=122.5;
    pos1.latitude=558.22142;
    // user.adresse.push(pos1);

    let pos2:Location=new Location();
    pos2.name="Simbock, Yaoundé";
    pos2.longitude=5514.5;
    pos2.latitude=88954.22142;
    // user.locations.push(pos2);


    let add:Address=new Address();
    add.email="alvinebedjama@gmail.com";
    add.country="Ruissi";
    add.mobilePhone="+1 265 41425 212";
    add.websiteLink="alvin-bed.com";

    user.adresse=add;
    //let m=new MongooseDBManager(jsonConfig);
    //console.log("shema ",m.createShema(user));


    it("Test d'instanciation de la classe de persistence",()=>
    {
        chai.expect(db instanceof MongoDBManager).to.be.true;
    });

    it("test de connexion a mongodb",async ()=>{
        let con=await db.connect();
        chai.expect(con.resultCode).to.equal(ActionResult.SUCCESS);  
    });

    it("test de creation d'un compte utilisateur",async(done)=>
    {
        //await db.createCollection("cedric");
        /*db.addToCollection("cedric",user)
        .then((r)=>db.getQueryBuilder(user).findInCollection("cedric",{}))
        .then((data:any)=>
        {
            console.log("created user ",data);
            db.disconnect();
            done()
        }).catch((e:any)=>console.error(e));
       
        */
    //    db.findInCollection("cedric",{})
        //console.log("manager test ", );
        //chai.expect(res.resultCode).to.equal(ActionResult.SUCCESS);
    });    
    
});