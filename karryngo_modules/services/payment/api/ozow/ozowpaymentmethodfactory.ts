import { RestApi } from "../../../../../karryngo_core/http/client/restapi";
import { InjectorContainer } from "../../../../../karryngo_core/lifecycle/injector_container";
import { PaiementStrategyType } from "../../enums";
import { PaymentException } from "../../exceptions/PaymentException";
import { PaiementMethodStrategy } from "../../interfaces/paiementmethod.interface";

import { BankPaiementStrategy } from "./paiementstrategi/bankpaiementstrategy";
import { PaiementMethodStrategyService } from "./paiementstrategi/paiementmethodstrategi.service";


export class OzowPaiementMethodFactory
{
    getMethodPaiment(method:PaiementStrategyType):PaiementMethodStrategy
    {
        let paiementStrategiService=InjectorContainer.getInstance().getInstanceOf<PaiementMethodStrategyService>(PaiementMethodStrategyService);

        let paiementMethodStrategi:PaiementMethodStrategy=new BankPaiementStrategy(paiementStrategiService);
        switch(method)
        {
            case PaiementStrategyType.BANK:
                paiementMethodStrategi = new BankPaiementStrategy(paiementStrategiService);
            case PaiementStrategyType.MTN_MONEY:
            case PaiementStrategyType.ORANGE_MONEY:
                // paiementMethodStrategi=new MobileMoneyPaiementMethod(paiementStrategiService);
                throw new PaymentException(PaymentException.UNSUPPORTED_MOBILE_PAYMENT_METHOD,"Mobile payment method not supported")            
        }
        return paiementMethodStrategi
    }
}