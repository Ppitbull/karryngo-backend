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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_1 = require("../../karryngo_modules/services/geolocalisation/entities/location");
const Address_1 = require("../../karryngo_modules/services/usermanager/entities/Address");
const User_1 = require("../../karryngo_modules/services/usermanager/entities/User");
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
const KarryngoPersistenceManagerFactory_1 = require("../persistence/KarryngoPersistenceManagerFactory");
const MongoDBManager_1 = require("../persistence/MongoDBManager");
const ActionResult_1 = require("../utils/ActionResult");
const mongoose_1 = __importDefault(require("mongoose"));
var chai = require('chai');
function createCollection(collectionName) {
    mongoose_1.default.model(collectionName.toString());
}
describe('Test du service de Persistance', () => {
    let jsonConfigFactory = new KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory();
    let jsonConfig = jsonConfigFactory.getInstance();
    let persistenceFactory = new KarryngoPersistenceManagerFactory_1.KarryngoPersistenceManagerFactory(jsonConfigFactory);
    let db = persistenceFactory.getInstance();
    let user = new User_1.User();
    user.firstname = "Sanou Kue";
    user.lastname = "Flambel Junion";
    let pos1 = new location_1.Location();
    pos1.name = "Villageois bar, Bangangté";
    pos1.longitude = 122.5;
    pos1.latitude = 558.22142;
    // user.adresse.push(pos1);
    let pos2 = new location_1.Location();
    pos2.name = "Simbock, Yaoundé";
    pos2.longitude = 5514.5;
    pos2.latitude = 88954.22142;
    // user.locations.push(pos2);
    let add = new Address_1.Address();
    add.email = "alvinebedjama@gmail.com";
    add.country = "Ruissi";
    add.mobilePhone = "+1 265 41425 212";
    add.websiteLink = "alvin-bed.com";
    user.adresse = add;
    //let m=new MongooseDBManager(jsonConfig);
    //console.log("shema ",m.createShema(user));
    it("Test d'instanciation de la classe de persistence", () => {
        chai.expect(db instanceof MongoDBManager_1.MongoDBManager).to.be.true;
    });
    it("test de connexion a mongodb", () => __awaiter(void 0, void 0, void 0, function* () {
        let con = yield db.connect();
        chai.expect(con.resultCode).to.equal(ActionResult_1.ActionResult.SUCCESS);
    }));
    it("test de creation d'un compte utilisateur", (done) => __awaiter(void 0, void 0, void 0, function* () {
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
    }));
});
