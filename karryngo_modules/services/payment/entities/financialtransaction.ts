import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { FinancialTransactionErrorType, FinancialTransactionState, FinancialTransactionType, PaiementStrategyType } from "../enums";

export class FinancialTransaction extends KarryngoPersistentEntity
{
    state:FinancialTransactionState=FinancialTransactionState.FINANCIAL_TRANSACTION_START;
    startDate:String="";
    endDate:String="";
    amount:number=0;
    type:FinancialTransactionType=FinancialTransactionType.DEPOSIT;
    ref:number=0;
    urlToRedirect:String="";
    token:String="";
    error:FinancialTransactionErrorType=FinancialTransactionErrorType.NO_ERROR;
    paiementMode:PaiementStrategyType=PaiementStrategyType.BANK;

    toString():Record<string,any>
    {
        return {
            state:this.state,
            startDate:this.startDate,
            endDate:this.endDate,
            amount:this.amount,
            type:this.type,
            ref:this.ref,
            urlToRedirect:this.urlToRedirect,
            token:this.token,
            error:this.error,
            paiementMode:this.paiementMode
        }
    }

    

    static generateRef():string
    {
        return `${Math.floor(Math.random()*100000)}`;
    }
}