/**
@author Cedric nguendap
@description Cette classe est une classe abstraite qui represente un client de la plateforme
@created 13/10/2020
*/

import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { User } from "../../../services/usermanager/entities/User";
import { Wallet } from "../../../services/payment/entities/wallet";
import { PaiementMethodEntity } from "../../../services/payment/entities/paiementmethodentity";
import { paiementMethodBuilder } from "../../../services/payment/entities/paiementmethodbuilder";

export class Customer extends User
{
    passportNumber:String="";
    isProvider:Boolean=false;
    isCompany:boolean=false;
    paimentMethodList:PaiementMethodEntity[]=[]
    wallet:Wallet=new Wallet(new EntityID());
    histories:History[]=[];
    accountType:String = "";

    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.isProvider=this.purgeAttribute(entity,"isProvider")
        this.passportNumber=this.purgeAttribute(entity,"passportNumber");
        this.isCompany=this.purgeAttribute(entity,"isCompany");
        this.wallet.hydrate(this.purgeAttribute(entity,"wallet"));
        this.paimentMethodList=this.purgeAttribute(entity,"paimentMethodList")?this.purgeAttribute(entity,"paimentMethodList").map((paiementMethod:Record<string,any>)=> paiementMethodBuilder(paiementMethod)):[];
        this.accountType = this.purgeAttribute(entity, "accountType") ? this.purgeAttribute(entity, "accountType") : ""
    }
    toString():any
    {
        return {
            ...super.toString(),
            isProvider:this.isProvider,            
            passportNumber:this.passportNumber,
            isCompany:this.isCompany,
            wallet:this.wallet.toString(),
            paimentMethodList:this.paimentMethodList.map((method:PaiementMethodEntity)=>method.toString()),
            accountType:this.accountType
        }
    }
}