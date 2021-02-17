/**
@author Cedric nguendap
@description Cette classe est une classe abstraite qui represente un client de la plateforme
@created 13/10/2020
*/

import { User } from "../../../services/usermanager/entities/User";

export class Customer extends User
{
    public passportNumber:String="";
    isProvider:Boolean=false;

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.isProvider=this.purgeAttribute(entity,"isProvider")
        this.passportNumber=this.purgeAttribute(entity,"passportnumber");
    }
    toString():any
    {
        return {
            ...super.toString(),
            isProvider:this.isProvider,
            "passportNumber":this.passportNumber
        }
    }
}