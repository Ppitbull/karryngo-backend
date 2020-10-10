/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/
import {KarryngoException} from './KarryngoException';

export class KarryngoRoutingException extends KarryngoException
{
    static BAD_ROUTE_CONFIGURATION:Number=-20;
    static ROUTE_NOT_FOUND:Number=-19;
    static ROUTE_PARAM_NOT_FOUND:Number=-18;
    static ACTION_NOT_FOUND:Number=-17;
    static METHOD_NOT_FOUND:Number=-16;
    static MODULE_NOT_FOUND:Number=-15;

    constructor(code:Number,description:String)
    {
        super(code,"Erreur de routage: "+description,description);
    }
}