import { RestApi } from "../../../karryngo_core/http/client/restapi";
import { PaiementMethod } from "./paiementmethod.interface";
import { BanquePaiementStrategy } from "./paiementstrategi/banquepaiementmethod";

export enum PaiementMethodType
{
    BANQUE="banque",
    ORANGE_MONEY="orange_money",
    MTN_MONEY="mtn_money",
    CREDIT_CARD="credit_card"
}

export class ToupesuPaiementMethodFactory
{
    static getMethodPaiment(method:PaiementMethodType):PaiementMethod
    {
        let paiementMethodStrategi:PaiementMethod=new BanquePaiementStrategy();
        switch(method)
        {
            case PaiementMethodType.BANQUE:
                break;
        }
        return paiementMethodStrategi
    }
}