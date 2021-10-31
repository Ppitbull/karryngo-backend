import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
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

    hydrate(entity:Record<string,any>):void
    {
        this.state=this.purgeAttribute(entity,"state");
        this.startDate=this.purgeAttribute(entity,"startDate");
        this.endDate=this.purgeAttribute(entity,"endDate");
        this.amount=this.purgeAttribute(entity,"amount");
        this.type=this.purgeAttribute(entity,"type");
        this.ref=this.purgeAttribute(entity,"ref");
        this.urlToRedirect=this.purgeAttribute(entity,"urlToRedirect");
        this.token=this.purgeAttribute(entity,"token");
        this.error=this.purgeAttribute(entity,"error");
        this.paiementMode=this.purgeAttribute(entity,"paiementMode");
    }

    static generateRef():string
    {
        return "1454551515151515";
    }
}