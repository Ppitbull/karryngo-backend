/**
@author: Cedric nguendap
@description: Exception lié a l'accés et la manipulation de la bd
@see KarryngoException
@created: 22/09/2020
*/
import {KarryngoException} from './KarryngoException';

export class DataBaseException extends KarryngoException
{
    static DATABAE_DISCONNECTED:Number=-60;
    constructor(code:Number,description:String)
    {
        super(code,"Erreur de communication avec la bd: "+description,description);
    }
}