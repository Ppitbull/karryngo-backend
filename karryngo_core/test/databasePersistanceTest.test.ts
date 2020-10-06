import * as assert from 'assert';
import { User } from '../../karryngo_modules/services/usermanager/entities/User';
import { JsonFileConfigurationService } from '../config/JsonFileConfigurationService';
import { KarryngoConfigurationServiceFactory } from '../config/KarryngoConfigurationServiceFactory';
import { MongooseDBManager } from '../persistence/MongooseDBManager';
import { DynamicLoader } from '../utils/DynamicLoader';

var chai=require('chai');

describe('Test du service de Persistance',()=>
{
    let jsonConfigFactory=new KarryngoConfigurationServiceFactory();
    let jsonConfig=jsonConfigFactory.getInstance();
    let db:MongooseDBManager=new MongooseDBManager(jsonConfig);
    let user:any=new User("ljsdflqm","Cedric","Nguendap");
    console.log("database ",db.createShema(user));
    
    
});