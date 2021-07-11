import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { TransactionService } from "../../bussiness/service/entities/transactionservice";
import { User } from "../usermanager/entities/User";

export interface PaiementMethod
{
    buy(transaction:TransactionService,buyer:User):Promise<ActionResult>
    check(transaction:TransactionService,buyer:User):Promise<ActionResult>
    cancel(transaction:TransactionService,buyer:User):Promise<ActionResult>
}