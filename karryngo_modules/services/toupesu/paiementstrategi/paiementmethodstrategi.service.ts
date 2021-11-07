import Configuration from "../../../../config-files/constants";
import { Service } from "../../../../karryngo_core/decorator";
import { KRequest } from "../../../../karryngo_core/http/client/krequest";
import { KResponse } from "../../../../karryngo_core/http/client/kresponse";
import { RestApi } from "../../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { FinancialTransaction } from "../entities/financialtransaction";
import { FinancialTransactionState, FinancialTransactionErrorType } from "../enums";

@Service()
export class PaiementMethodStrategyService
{
    constructor (private restapi:RestApi=new RestApi()){}
    
    buy(url:string,data:Record<string,any>):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let transactionRef=FinancialTransaction.generateRef();
            this.restapi.sendRequest(
                new KRequest()
                .post()
                .json()
                .url(url)
                .data(data)              
            ).then((result:ActionResult)=>{
                let response:KResponse=result.result
                console.log("result paiement ",response)
                if(response.getData().success==true)
                {
                    result.result={                      
                        ref:transactionRef,
                        urlToRedirect:response.getData().url || "",
                        token:response.getData().pay_token
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

    check(url:string,data:Record<string,any>): Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.restapi.sendRequest(
                new KRequest()
                .post()
                .url(url)
                .form()
                .data(data)
            )
            .then((result:ActionResult)=>{                
                let response:KResponse=result.result;
                let data={
                    endDate:response.getData().paymentDate,
                    error:FinancialTransactionErrorType.NO_ERROR,
                    reason:""
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
                    else if(response.getData().pay_status.toUpperCase()=="FAILED")
                    {
                        data[status]=FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                    }
                    result.result=data;
                    resolve(result);
                }
                reject(result);
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }
    cancel(url:string,data:Record<string,any>): Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            
        })
    }
}