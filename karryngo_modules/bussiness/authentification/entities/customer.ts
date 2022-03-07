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
import { UserHistory } from "../../../services/historique/history";

export class Customer extends User
{
    passportNumber:String="";
    isProvider:Boolean=false;
    isCompany:boolean=false;
    paimentMethodList:PaiementMethodEntity[]=[]
    wallet:Wallet=new Wallet(new EntityID());
    histories:UserHistory[]=[];
    accountType:String = "";

    hydrate(entity:any):void
    {
        for (const key of Object.keys(entity)) {
            

            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "wallet") this.wallet.hydrate(entity[key]);
            else if (key == "address") this.adresse.hydrate(entity[key]);
            else if (key == "paimentMethodList") this.paimentMethodList=entity[key].map((paiementMethod: Record<string, any>) => paiementMethodBuilder(paiementMethod))
            else if (key == "histories") this.histories = entity[key].map((history: Record<string, any>) => {
                let histo=new UserHistory();
                histo.hydrate(history)
                return histo;
            })
            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }
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