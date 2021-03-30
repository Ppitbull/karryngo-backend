/**
@author Cedric nguendap
@description Cette classe est une classe abstraite qui represente un client de la plateforme
@created 13/10/2020
*/

import { User } from "../../../services/usermanager/entities/User";

export class Customer extends User
{
    passportNumber:String="";
    isProvider:Boolean=false;
    isCompany:boolean=false;

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.isProvider=this.purgeAttribute(entity,"isProvider")
        this.passportNumber=this.purgeAttribute(entity,"passportnumber");
        this.isCompany=this.purgeAttribute(entity,"isCompany");
    }
    toString():any
    {
        return {
            ...super.toString(),
            isProvider:this.isProvider,            
            "passportNumber":this.passportNumber,
            isCompany:this.isCompany
        }
    }
}