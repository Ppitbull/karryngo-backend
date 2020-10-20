/**
@author Cedric nguendap
@description Cette classe présente une action fait par l'utilisateur a partir
    d'une url
@created 18/10/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";


export class Action extends KarryngoApplicationEntity
{
    public method:String="";

    public params:any={};

    public action:String="";

    public secure:Boolean=true;

    constructor(
        method:String="",
        action:String="",
        params:any={},
        secure:Boolean=true)
        {
            super();
            this.action=action;
            this.method=method;
            this.params=params;
            this.secure=secure;
        }
    
    isSecure():Boolean
    {
        return this.secure;
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }

}