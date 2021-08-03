import { RestApi } from "../../../karryngo_core/http/client/restapi";
import { PaiementStrategyType } from "./enums";
import { PaiementMethodStrategy } from "./paiementmethod.interface";
import { BankPaiementStrategy } from "./paiementstrategi/bankpaiementmethod";


export class ToupesuPaiementMethodFactory
{
    static getMethodPaiment(method:PaiementStrategyType):PaiementMethodStrategy
    {
        let paiementMethodStrategi:PaiementMethodStrategy=new BankPaiementStrategy();
        switch(method)
        {
            case PaiementStrategyType.BANK:
                break;
        }
        return paiementMethodStrategi
    }
}