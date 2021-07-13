import { KRequest } from "../../../../karryngo_core/http/client/krequest";
import { RestApi } from "../../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { TransactionService } from "../../../bussiness/service/entities/transactionservice";
import { User } from "../../usermanager/entities/User";
import { PaiementMethod } from "../paiementmethod.interface";

export class BanquePaiementStrategy implements PaiementMethod
{
    constructor (private restapi:RestApi=new RestApi()){}

    buy(transaction: TransactionService, buyer: User): Promise<ActionResult> {
        // this.restapi.sendRequest(new KRequest().)
        throw new Error("Method not implemented.");
    }
    check(transaction: TransactionService, buyer: User): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    cancel(transaction: TransactionService, buyer: User): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    
}