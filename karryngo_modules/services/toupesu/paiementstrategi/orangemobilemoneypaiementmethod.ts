import { ConfigurableApp } from "../../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService } from "../../../../karryngo_core/decorator";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { TransactionService } from "../../../bussiness/service/entities/transactionservice";
import { User } from "../../usermanager/entities/User";
import { FinancialTransaction } from "../entities/financialtransaction";
import { PaiementMethodEntity } from "../entities/paiementmethodentity";
import { PaiementMethodStrategy } from "../paiementmethod.interface";
import { PaiementMethodStrategyService } from "./paiementmethodstrategi.service";

export class OrangeMobileMoneyPaiementMethod implements PaiementMethodStrategy
{

    @ConfigService()
    configService:ConfigurableApp;

    constructor (
        private paiementMethodeStrategyService:PaiementMethodStrategyService){}

    buy(transaction: TransactionService, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        let transactionRef=FinancialTransaction.generateRef();

        return this.paiementMethodeStrategyService.buy(
            this.configService.getValueOf("paiement").orangePaiementUrl,
            {
                refID:transactionRef,
                amount:transaction.price,         
                moneyCode:paiementMethod.moneyCode,
                product:this.configService.getValueOf("paiement").product,
                msidn:buyer.adresse.phone
                // cancelUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].cancelUrl,
                // successUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].successUrl,
                // errorUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].errorUrl,
            }
        )   
    }
    
    check(financialTransaction: FinancialTransaction, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        return this.paiementMethodeStrategyService.check(
            this.configService.getValueOf("paiement").orangeCheckPaiementUrl,
            {
                // refid:financialTransaction.ref,
                product:this.configService.getValueOf("paiement").product,
                pay_token:financialTransaction.token
            }
        )
    }
    cancel(transaction: TransactionService, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        return this.paiementMethodeStrategyService.cancel(
            this.configService.getValueOf("paiement").orangeCancelPaiementUrl,
            {}
        )
    }
    
}