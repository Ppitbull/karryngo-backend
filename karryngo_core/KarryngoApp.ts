
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/

import { KarryngoApplicationEntity } from "./KarryngoApplicationEntity";
import { KarryngoEntity } from "./KarryngoEntity";
import { KarryngoConfigurationServiceFactory } from "./config/KarryngoConfigurationServiceFactory";
import { KarryngoPersistenceManagerFactory } from "./persistence/KarryngoPersistenceManagerFactory";
import { RouterService } from "./routing/RouterService";
import * as express from 'express';

export class KarryngoApp extends KarryngoApplicationEntity
{

    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    /*protected configurationServiceFactory:KarryngoConfigurationServiceFactory;
    protected persistanceManagerFactory:KarryngoPersistenceManagerFactory;
    protected routerService:RouterService;*/

    constructor()
    {
        super();
        //this.configurationServiceFactory=new KarryngoConfigurationServiceFactory();
    }
    run()
    {
        /*let configurationServiceIntance=this.configurationServiceFactory.getInstance();
        this.persistanceManagerFactory=new KarryngoPersistenceManagerFactory(configurationServiceIntance);
        let persistenceManagerInstance=this.persistanceManagerFactory.getInstance();
        this.routerService=new RouterService(configurationServiceIntance,express.Router);
        this.routerService.run(persistenceManagerInstance);*/
    }
    
}