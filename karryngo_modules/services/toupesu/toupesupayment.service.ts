import { DBPersistence, Service } from "../../../karryngo_core/decorator";
import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { TransactionService } from "../../bussiness/service/entities/transactionservice";
import { TransportServiceType } from "../../bussiness/service/entities/transportservicetype";
import { UserHistory } from "../historique/history";
import { HistoryService } from "../historique/historyService";
import { FinancialTransaction } from "./entities/financialtransaction";
import { MobilePaiementMethodEntity } from "./entities/mobilepaiementmethodentity";
import { PaiementMethodEntity } from "./entities/paiementmethodentity";
import { FinancialTransactionErrorType, FinancialTransactionState, FinancialTransactionType, PaiementStrategyType } from "./enums";
import { PaiementMethodStrategy } from "./paiementmethod.interface";
import { OrangeMobileMoneyPaiementMethod } from "./paiementstrategi/orangemobilemoneypaiementmethod";
import { WalletService } from "./wallet.service";

@Service()
export class ToupesuPaiement
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(protected historyService:HistoryService,protected walletService:WalletService){}
    
    makePaiement(toupesuPaiementMethod:PaiementMethodStrategy,service:TransportServiceType,buyer:Customer,paiementMethod:PaiementStrategyType):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let history:UserHistory; 
            let paiementMethodEntity:PaiementMethodEntity;
            let transaction:TransactionService;
            this.historyService.checkExistHistory(buyer,service.id)
            .then((result:ActionResult)=>{
                if(result.result.length>0) 
                {
                    result.resultCode=ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                    return Promise.reject(result);
                }
                return this.historyService.findHistory(buyer,service.id)
            })
            .then((result:ActionResult)=>{
                history=result.result;
                paiementMethodEntity=buyer.paimentMethodList.find((p:PaiementMethodEntity)=>p.type==paiementMethod)
                if(paiementMethodEntity)
                {
                    transaction=service.transactions.find((transaction:TransactionService)=>transaction.id.toString()==service.idSelectedTransaction); 
                    return toupesuPaiementMethod.buy(
                        transaction,
                        buyer,
                        paiementMethodEntity
                    )
                }
                
                result.result=null;
                    result.resultCode=FinancialTransactionErrorType.PAIMENT_METHOD_NOT_FOUND;
                    return Promise.reject(result);
            })
            .then((result:ActionResult)=>{
                history.financialTransaction.state=FinancialTransactionState.FINANCIAL_TRANSACTION_PENDING;
                history.financialTransaction.startDate=new Date().toISOString();
                history.financialTransaction.amount=parseInt(transaction.price.toString());
                history.financialTransaction.ref=result.result.ref;
                history.financialTransaction.urlToRedirect=result.result.urlToRedirect;
                history.financialTransaction.token=result.result.token;
                history.financialTransaction.error=result.result.error;
                history.financialTransaction.paiementMode=paiementMethodEntity.type;

                return this.historyService.updateTransaction(buyer,service.id,history.toString())
            })
            .then((result:ActionResult)=>{
                result.result=history;
                resolve(result)
            })
            .catch((error:ActionResult)=> reject(error));
        })
    }
    checkPaiement(toupesuPaiementMethod:PaiementMethodStrategy,service:TransportServiceType,financialTransaction:FinancialTransaction,buyer:Customer,paiementMethod:PaiementStrategyType):Promise<ActionResult>
    {
        let r={};
        return new Promise<ActionResult>((resolve,reject)=>{
            toupesuPaiementMethod.check(
                financialTransaction,
                buyer,
                buyer.paimentMethodList.find((paiementMethodEntity:PaiementMethodEntity)=>paiementMethodEntity.type==paiementMethod)
            )
            .then((result:ActionResult)=>{
                r={
                    state:result.result.status,
                    endDate:result.result.endDate
                };
                return this.historyService.updateTransaction(buyer,service.id,r)
            })
            .then((result:ActionResult)=>{
                if(r["state"]==FinancialTransactionState.FINANCIAL_TRANSACTION_SUCCESS)
                {
                    if(financialTransaction.type==FinancialTransactionType.DEPOSIT)
                    {
                        return this.walletService.increaseWallet(buyer.id,financialTransaction.amount);
                    }
                    else 
                    {
                        return this.walletService.decreaseWallet(buyer.id,financialTransaction.amount)
                    }
                }
                return Promise.resolve(new ActionResult())
            })
            .then((result:ActionResult)=>{
                result.result=r;
                resolve(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }
    cancelPaiement(toupesuPaiementMethod:PaiementMethodStrategy,transactionservice:TransactionService,buyer:Customer,paiementMethod:PaiementStrategyType):Promise<ActionResult>
    {
        throw new Error("Method not implemented.");
    }
}