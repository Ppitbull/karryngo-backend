import Configuration from "../../config-files/constants";
/**
@author: Cedric nguendap
@description: Cette classe est une classe fabrique permettant de fabriquer l'unité 
    de configuration (json, xml,...)
@created: 23/09/2020
*/

import { ConfigurableApp } from "./ConfigurableApp.interface";
import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { ConfigurationException } from "../exception/ConfigurationException";
import { DynamicLoader } from "../utils/DynamicLoader";


export class KarryngoConfigurationServiceFactory extends KarryngoApplicationEntity
{
    protected configService:ConfigurableApp;

    constructor()
    {
        super();
        this.configService=DynamicLoader.load(Configuration.class_for_configuration);
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method not implemented.");
    }

    /**
     * @inheritdoc
     */
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    
    /**
     * @description permet d'obtenir l'instance de l'unité de configuration créer dans le constructeur
     *   cette unité de configuration est configurer dans le fichier de configuration app.json
     * @return une implémentation de l'interface ConfigurablaApp
     */
    getInstance():ConfigurableApp
    {       
        return this.configService;
    }
}