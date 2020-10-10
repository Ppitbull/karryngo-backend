import { ConfigurableApp } from "../config/ConfigurableApp.interface";
/**
@author: Cedric nguendap
@description: Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created: 23/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { DynamicLoader } from "../utils/DynamicLoader";
import { PersistenceManager } from "./PersistenceManager.interface";


export class KarryngoPersistenceManagerFactory extends KarryngoApplicationEntity
{
    protected configService:ConfigurableApp;

    constructor(config:ConfigurableApp)
    {
        super();
        this.configService=config;
    }
    
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method toString() not implemented.");
    }

    /**
     * @inheritdoc
     */
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method hydrate() not implemented.");
    }
    
    /**
     * @description permet de creer une instance de l'unité de persistace. cette unité de persistance
     *  est configurer dans le fichier de configuration persistance.json
     * @return une implémentation de l'interface PersistenceManager
     */
    getInstance():PersistenceManager
    {
        return DynamicLoader.load(this.configService.getValueOf('persistence').classe,[this.configService]);
    }
}