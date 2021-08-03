/**
@author: Cedric nguendap
@description: Exception lié au chargment dynamique des modules de l'application de l'application
@see KarryngoException
@created: 22/09/2020
*/
import {KarryngoException} from './KarryngoException';

export class KarryngoLoaderException extends KarryngoException
{
    static CLASS_NOT_FOUND:Number=-30;
    static METHOD_NOT_FOUND:Number=-29;
    constructor(code:Number,description:String)
    {
        super(code,"Erreur de chargement : "+description,description);
    }
}