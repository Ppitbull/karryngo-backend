/**
@author: Cedric nguendap
@description: Exception de base de l'application Karryngo
@created: 22/09/2020
*/

export abstract class  KarryngoException extends Error {

    /**
     * @name _description
     * @type String
     * @description permet de contenir la description de l'exception
     */
    private _description:String;

    /**
     * @constructor
     * @param code code de l'exception
     * @param message message de l'exception
     * @param description description de l'exception
     */
    constructor(code:Number,message:String,description:String="") {
        super(message.toString());
        this._description=description;
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }

    /**
     * @description permet de retourner la description de l'exception
     * @returns la description de l'exception
     */
    get description():String
    {
        return this._description;
    }

    /**
     * @description permet d'affecter la description de l'exception
     * @param desc la description de l'exception
     */
    set decription(desc:String)
    {
        this._description=desc;
    }
}