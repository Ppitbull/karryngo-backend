import { ConfigurableApp } from "../config/ConfigurableApp.interface";
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { PersistenceManager } from "./PersistenceManager.interface";


export class KarryngoPersistenceManagerFactory extends KarryngoApplicationEntity
{
    protected configService:ConfigurableApp;

    constructor(config:ConfigurableApp)
    {
        super();
        this.configService=config;
    }
    
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    
    getInstance():PersistenceManager
    {
        let instance=require(`${this.configService.getValueOf('persistance').classe}`);
        return new instance(this.configService);
    }
}