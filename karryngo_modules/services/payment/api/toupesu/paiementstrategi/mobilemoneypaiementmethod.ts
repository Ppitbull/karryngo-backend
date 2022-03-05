import Configuration from "../../../../../../config-files/constants";
import { ConfigurableApp } from "../../../../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService } from "../../../../../../karryngo_core/decorator";
import { RestApi } from "../../../../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../../../../karryngo_core/utils/ActionResult";
import { Customer } from "../../../../../bussiness/authentification/entities/customer";
import { TransactionService } from "../../../../../bussiness/service/entities/transactionservice";
import { User } from "../../../../usermanager/entities/User";
import { FinancialTransaction } from "../../../entities/financialtransaction";
import { MobilePaiementMethodEntity } from "../../../entities/mobilepaiementmethodentity";
import { PaiementMethodEntity } from "../../../entities/paiementmethodentity";
import { PaiementMethodStrategy } from "../../../interfaces/paiementmethod.interface";

import { PaiementMethodStrategyService } from "./paiementmethodstrategi.service";

export class MobileMoneyPaiementMethod  implements PaiementMethodStrategy
{

    @ConfigService()
    configService:ConfigurableApp;

    constructor (
        private paiementMethodeStrategyService:PaiementMethodStrategyService){}

    buy(transaction: TransactionService, buyer: User,paiementMethod:MobilePaiementMethodEntity): Promise<ActionResult> {
        let transactionRef=FinancialTransaction.generateRef();
        return this.paiementMethodeStrategyService.buy(
            this.configService.getValueOf("paiement").paiementUrl,
            {
                refID:transactionRef,
                amount:transaction.price,         
                moneyCode:paiementMethod.moneyCode,
                product:this.configService.getValueOf("paiement").product,
                msidn:paiementMethod.number,
                paymentMethod:paiementMethod.type
                // cancelUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].cancelUrl,
                // successUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].successUrl,
                // errorUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].errorUrl,
            }
        )   
    }
    
    check(financialTransaction: FinancialTransaction, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        
        return this.paiementMethodeStrategyService.check(
            this.configService.getValueOf("paiement").checkPaiementUrl,
            {
                refID:financialTransaction.ref,
                product:this.configService.getValueOf("paiement").product,
                paymentMethod:financialTransaction.paiementMode
            }
        )
    }
    cancel(transaction: TransactionService, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        return this.paiementMethodeStrategyService.cancel(
            this.configService.getValueOf("paiement").mtnCancelPaiementUrl,
            {}
        )
    }
    
}