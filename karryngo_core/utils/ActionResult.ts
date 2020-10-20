/**
* @author Cedric nguendap
* @description Cette class represente le resultat d'une action et qui requiere des informations 
*    sur le resultat
* @created 23/09/2020
* @modified by Cedric nguendap 19/10/2020
*/
export class ActionResult
{
    message:String="";
    description:String="";
    resultCode:Number=0;
    result:any="";
    static RESSOURCE_NOT_FOUND_ERROR=-1;
    static NETWORK_ERROR=-2;
    static UNKNOW_ERROR=-10;
    static SUCCESS=0;
    static RESSOURCE_ALREADY_EXIST_ERROR:Number=-4;
    constructor(code=ActionResult.SUCCESS,message="success",description='',result={}) {
        this.resultCode=code;
        this.message=message;
        this.description=description;
        this.result=result;
    }
}