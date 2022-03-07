import Configuration from "../../../../../../config-files/constants";
import { Service } from "../../../../../../karryngo_core/decorator";
import { KRequest } from "../../../../../../karryngo_core/http/client/krequest";
import { KResponse } from "../../../../../../karryngo_core/http/client/kresponse";
import { RestApi } from "../../../../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../../../../karryngo_core/utils/ActionResult";
import { FinancialTransaction } from "../../../entities/financialtransaction";
import { FinancialTransactionErrorType, FinancialTransactionState } from "../../../enums";

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
                if(response.getData().success==true)
                {
                    result.result={                      
                        ref:transactionRef,
                        urlToRedirect:response.getData().url || "",
                        token:response.getData().pay_token,
                        error:FinancialTransactionErrorType.NO_ERROR
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
            .catch((error:ActionResult)=>
            {
                console.log("Error 2",error)
                reject(error)
            })
        }) 
    }

    check(url:string,data:Record<string,any>): Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            console.log("URL ",url)
            this.restapi.sendRequest(
                new KRequest()
                .post()
                .url(url)
                .json()
                .data(data)
            )
            .then((result:ActionResult)=>{                
                let response:KResponse=result.result;
                console.log("Data ",data)
                let datas={
                    endDate:response.getData().paymentDate,
                    error:FinancialTransactionErrorType.NO_ERROR,
                    reason:"",
                    status:FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR
                };
                console.log("response ",response.getData())
                if(response.getData().success==true )
                {
                    if(response.getData().status.toLowerCase()=="pending")
                    {
                        datas["status"]=FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                    }
                    else if(response.getData().status.toLowerCase()=="canceled")
                    {
                        datas["status"]=FinancialTransactionState.FINANCIAL_TRANSACTION_PAUSE;
                    }
                    else if(response.getData().status.toLowerCase()=="successful")
                    {
                        datas["status"]=FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS;
                    }
                    else if(response.getData().status.toLowerCase()=="failed")
                    {
                        datas["status"]=FinancialTransactionState.FINANCIAL_TRANSACTION_ERROR;
                    }
                    result.result=datas;
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