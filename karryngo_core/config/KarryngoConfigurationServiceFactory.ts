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
    
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    
    getInstance():ConfigurableApp
    {       
        return DynamicLoader.load(Configuration.class_for_configuration);
    }
}