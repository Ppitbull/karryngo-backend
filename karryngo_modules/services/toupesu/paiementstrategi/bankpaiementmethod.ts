import Configuration from "../../../../config-files/constants";
import { ConfigurableApp } from "../../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService } from "../../../../karryngo_core/decorator";
import { KRequest } from "../../../../karryngo_core/http/client/krequest";
import { KResponse } from "../../../../karryngo_core/http/client/kresponse";
import { RestApi } from "../../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { TransactionService } from "../../../bussiness/service/entities/transactionservice";
import { User } from "../../usermanager/entities/User";
import { FinancialTransaction } from "../entities/financialtransaction";
import { PaiementMethodEntity } from "../entities/paiementmethodentity";
import { FinancialTransactionErrorType, FinancialTransactionState } from "../enums";
import { PaiementMethodStrategy } from "../paiementmethod.interface";

export class BankPaiementStrategy implements PaiementMethodStrategy
{
    @ConfigService()
    configService:ConfigurableApp;

    constructor (private restapi:RestApi=new RestApi()){}

    buy(transaction: TransactionService, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            let transactionRef=FinancialTransaction.generateRef();
            this.restapi.sendRequest(
                new KRequest()
                .post()
                .json()
                .url(this.configService.getValueOf("paiement").ozowPaiementUrl)
                .data({
                    refID:transactionRef,
                    amount:transaction.price,         
                    moneyCode:paiementMethod.moneyCode,
                    cancelUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].cancelUrl,
                    successUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].successUrl,
                    errorUrl:this.configService.getValueOf("paiement")[Configuration.env_mode].errorUrl,
                    product:this.configService.getValueOf("paiement").product
                })              
            ).then((result:ActionResult)=>{
                let response:KResponse=result.result
                if(response.getData().success==true || response.getData().errorMessage==null)
                {
                    result.result={
                        amount:transaction.price,                        
                        ref:transactionRef,
                        urlToRedirect:response.getData().url,
                        token:response.getData().paymentRequestId,
                        paiementMode:paiementMethod.type
                    };
                    resolve(result);
                }
                else{
                    result.result={
                        state:FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR,
                        error:FinancialTransactionErrorType.UNKNOW_ERROR
                    }
                    reject(result);
                }
            })
            .catch((error:ActionResult)=>reject(error))
        })        
    }
    
    check(financialTransaction: FinancialTransaction, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.restapi.sendRequest(
                new KRequest()
                .post()
                .url(this.configService.getValueOf("paiement").ozowCheckPaiementUrl)
                .form()
                .data({
                    refid:financialTransaction.ref,
                    product:this.configService.getValueOf("paiement").product
                })
            )
            .then((result:ActionResult)=>{                
                let response:KResponse=result.result;
                let data={
                    endDate:response.getData().paymentDate
                };
                if(response.getData().success==true || response.getData().errorMessage==null)
                {
                    if(response.getData().pay_status==null || response.getData().pay_status.toLowerCase()=="pending")
                    {
                        data[status]=FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                    }
                    else if(response.getData().pay_status.toLowerCase()=="canceled")
                    {
                        data[status]=FinancialTransactionState.FINANCIAL_TRANSACTION_PAUSE;
                    }
                    else if(response.getData().pay_status.toLowerCase()=="complete")
                    {
                        data[status]=FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                    }
                    result.result=data;
                    resolve(result);
                }
                reject(result);
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }
    cancel(transaction: TransactionService, buyer: User,paiementMethod:PaiementMethodEntity): Promise<ActionResult> {
        throw new Error("Method not implemented.");
    }
    
}