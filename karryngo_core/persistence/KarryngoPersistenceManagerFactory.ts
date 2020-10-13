/**
@author Cedric nguendap
@description Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created 23/09/2020
*/

import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { KarryngoConfigurationServiceFactory } from "../config/KarryngoConfigurationServiceFactory";
import { KarryngoCore } from "../decorator/core.decorator";

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { DynamicLoader } from "../utils/DynamicLoader";
import { PersistenceManager } from "./PersistenceManager.interface";

@KarryngoCore()
export class KarryngoPersistenceManagerFactory extends KarryngoApplicationEntity
{
    protected persistance:PersistenceManager;

    constructor(protected configServiceFactory:KarryngoConfigurationServiceFactory)
    {
        super();
        this.persistance=DynamicLoader.load(this.configServiceFactory.getInstance().getValueOf('persistence').classe,[this.configServiceFactory.getInstance()]);
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
     * @description permet d'obtenir l'instance de l'unité de persistace creer dans le constructeur. cette unité de persistance
     *  est configurer dans le fichier de configuration persistance.json
     * @return une implémentation de l'interface PersistenceManager
     */
    getInstance():PersistenceManager
    {
        return this.persistance;
    }
}