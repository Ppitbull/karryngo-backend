import { RestApi } from "../../../../../karryngo_core/http/client/restapi";
import { InjectorContainer } from "../../../../../karryngo_core/lifecycle/injector_container";
import { PaiementStrategyType } from "../../enums";
import { PaymentException } from "../../exceptions/PaymentException";
import { PaiementMethodStrategy } from "../../interfaces/paiementmethod.interface";

import { BankPaiementStrategy } from "./paiementstrategi/bankpaiementmethod";
import { MobileMoneyPaiementMethod } from "./paiementstrategi/mobilemoneypaiementmethod";
import { MTNMobileMoneyPaiementMethod } from "./paiementstrategi/mtnmobilemoneypaiementmethod";
import { OrangeMobileMoneyPaiementMethod } from "./paiementstrategi/orangemobilemoneypaiementmethod";
import { PaiementMethodStrategyService } from "./paiementstrategi/paiementmethodstrategi.service";


export class ToupesuPaiementMethodFactory
{
    getMethodPaiment(method:PaiementStrategyType):PaiementMethodStrategy
    {
        let paiementStrategiService=InjectorContainer.getInstance().getInstanceOf<PaiementMethodStrategyService>(PaiementMethodStrategyService);

        let paiementMethodStrategi:PaiementMethodStrategy=new BankPaiementStrategy(paiementStrategiService);
        switch(method)
        {
            case PaiementStrategyType.BANK:
                throw new PaymentException(PaymentException.UNSUPPORTED_BANK_PAYMENT_METHOD, "Bank payment method not supported")
            case PaiementStrategyType.MTN_MONEY:
            case PaiementStrategyType.ORANGE_MONEY:
                paiementMethodStrategi=new MobileMoneyPaiementMethod(paiementStrategiService);
                break
            
        }
        return paiementMethodStrategi
    }
}