/*
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
import {KarryngoException} from './KarryngoException';

export class ConfigurationException extends KarryngoException
{
    static PARSE_FILE:Number=-100;
    static ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT:Number=-99;
    static CONFIGURABLE_KEY_NOT_FOUND:Number=-98;

    constructor(code:Number,description:String)
    {
        super(code,"Erreur de configuration",description);
    }
}