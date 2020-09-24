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
        let instance:any={};
        let keyClass:String='';
        try
        {
            instance=require(`${Configuration.class_for_configuration}`);
            for (let key in instance) keyClass=key;
        }catch(e:any)
        {
            throw new ConfigurationException(ConfigurationException.CLASS_CONFIGURATION_NOT_FOUND,"Erreur d'instanciation: "+e.message());
        }        
        return new instance[keyClass.toString()]();
    }
}