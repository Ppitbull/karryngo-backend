/**
@author Cedric nguendap
@description Cette classe est une classe abstraite et classe de base representant l'unite 
    de persistance de type NoSQL (MongoDB, Firebase...)
@created 23/09/2020
*/

import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService } from "../decorator/configuration.decorator";
import { KarryngoCore } from "../decorator/core.decorator";

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { DynamicLoader } from "../utils/DynamicLoader";
import { KarryngoFileStorage } from "./KarryngoFileStorage";

@KarryngoCore()
export class KarryngoFileStorageFactory extends KarryngoApplicationEntity
{
    protected kfs:KarryngoFileStorage;

    @ConfigService()
    configService:ConfigurableApp

    constructor()
    {
        super();
        this.kfs=DynamicLoader.load(this.configService.getValueOf('persistence').database_file.classe);
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
     * @description permet d'obtenir l'instance de l'unité de stackoge de fichier creer dans le constructeur. cette unité de persistance
     *  est configurer dans le fichier de configuration persistance.json
     * @return une implémentation de l'interface KarryngoFileStorage
     */
    getInstance():KarryngoFileStorage 
    {
        return this.kfs;
    }
}