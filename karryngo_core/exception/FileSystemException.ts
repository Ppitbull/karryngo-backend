/**
@author: Cedric nguendap
@description: Exception lié au systéme de fichier de nodejs
@see KarryngoException
@created: 22/09/2020
*/
import {KarryngoException} from './KarryngoException';

export class FileSystemException extends KarryngoException
{
    static FILE_NOT_FOUND:Number=-50;
    static UNKNOW_ERROR:Number=-49;
    
    constructor(code:Number,description:String)
    {
        super(code,"Erreur du systéme de fichier: "+description,description);
    }
}