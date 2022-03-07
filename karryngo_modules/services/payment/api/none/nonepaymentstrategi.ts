import { ActionResult } from "../../../../../karryngo_core/utils/ActionResult";
import { Customer } from "../../../../bussiness/authentification/entities/customer";
import { TransactionService } from "../../../../bussiness/service/entities/transactionservice";
import { FinancialTransaction } from "../../entities/financialtransaction";
import { PaiementMethodEntity } from "../../entities/paiementmethodentity";
import { FinancialTransactionErrorType, FinancialTransactionState } from "../../enums";
import { PaiementMethodStrategy } from "../../interfaces/paiementmethod.interface";


export class NonePaiementMethodStrategi implements PaiementMethodStrategy {
    buy(transaction: TransactionService, buyer: Customer, paiementMethod: PaiementMethodEntity): Promise<ActionResult> {
        let result = new ActionResult()
        let transactionRef = FinancialTransaction.generateRef();
        result.result = {
            ref: transactionRef,
            urlToRedirect: "",
            token: "",
            error: FinancialTransactionErrorType.NO_ERROR
        };
        return Promise.resolve(result);
    }
    check(financialTransaction: FinancialTransaction, buyer: Customer, paiementMethod: PaiementMethodEntity): Promise<ActionResult> {
        let result = new ActionResult()
        let datas = {
            endDate: "",
            error: FinancialTransactionErrorType.NO_ERROR,
            reason: "",
            status: FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS
        };

        result.result = datas;
        return Promise.resolve(result);
    }
    cancel(transaction: TransactionService, buyer: Customer, paiementMethod: PaiementMethodEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
}