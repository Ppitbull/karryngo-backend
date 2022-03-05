import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { Customer } from "../../../bussiness/authentification/entities/customer";
import { TransactionService } from "../../../bussiness/service/entities/transactionservice";
import { FinancialTransaction } from "../entities/financialtransaction";
import { PaiementMethodEntity } from "../entities/paiementmethodentity";


export interface PaiementMethodStrategy
{
    buy(transaction:TransactionService,buyer:Customer,paiementMethod:PaiementMethodEntity):Promise<ActionResult>
    check(financialTransaction:FinancialTransaction,buyer:Customer,paiementMethod:PaiementMethodEntity):Promise<ActionResult>
    cancel(transaction:TransactionService,buyer:Customer,paiementMethod:PaiementMethodEntity):Promise<ActionResult>
}