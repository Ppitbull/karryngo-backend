/**
* @author Cedric nguendap
* @description Cette class represente le resultat d'une action et qui requiere des informations 
*    sur le resultat
* @created 23/09/2020
*/
export class ActionResult
{
    protected _message:String="";
    protected _description:String="";
    protected _resultCode:Number=0;
    protected _result:any="";
    static RESSOURCE_NOT_FOUND_ERROR=-1;
    static NETWORK_ERROR=-2;
    static UNKNOW_ERROR=-10;
    static SUCCESS=0;
    constructor(code=ActionResult.SUCCESS,message="success",description='',result={}) {
        this.resultCode=code;
        this.message=message;
        this.description=description;
        this.result=result;
    }

    set message(mes:String)
    {
        this._message=mes;
    }
    set description(desc:String)
    {
        this._description=desc;
    }
    set resultCode(code:Number)
    {
        this._resultCode=code;
    }
    set result(res:any)
    {
        this._result=res;
    }

    get message():String
    {
        return this._message;
    }

    get description():String
    {
        return this._description;
    }

    get resultCode():Number
    {
        return this._resultCode;
    }
    get result():any
    {
        return this._result;
    }
}