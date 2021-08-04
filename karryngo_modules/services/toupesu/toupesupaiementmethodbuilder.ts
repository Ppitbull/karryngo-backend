import { RestApi } from "../../../karryngo_core/http/client/restapi";
import { InjectorContainer } from "../../../karryngo_core/lifecycle/injector_container";
import { PaiementStrategyType } from "./enums";
import { PaiementMethodStrategy } from "./paiementmethod.interface";
import { BankPaiementStrategy } from "./paiementstrategi/bankpaiementmethod";
import { MTNMobileMoneyPaiementMethod } from "./paiementstrategi/mtnmobilemoneypaiementmethod";
import { OrangeMobileMoneyPaiementMethod } from "./paiementstrategi/orangemobilemoneypaiementmethod";
import { PaiementMethodStrategyService } from "./paiementstrategi/paiementmethodstrategi.service";


export class ToupesuPaiementMethodFactory
{
    static getMethodPaiment(method:PaiementStrategyType):PaiementMethodStrategy
    {
        let paiementStrategiService=InjectorContainer.getInstance().getInstanceOf<PaiementMethodStrategyService>(PaiementMethodStrategyService);

        let paiementMethodStrategi:PaiementMethodStrategy=new BankPaiementStrategy(paiementStrategiService);
        switch(method)
        {
            case PaiementStrategyType.BANK:
                break;
            case PaiementStrategyType.MTN_MONEY:
                paiementMethodStrategi=new MTNMobileMoneyPaiementMethod(paiementStrategiService)
                break
            case PaiementStrategyType.ORANGE_MONEY:
                paiementMethodStrategi=new OrangeMobileMoneyPaiementMethod(paiementStrategiService)
                break
            
        }
        return paiementMethodStrategi
    }
}