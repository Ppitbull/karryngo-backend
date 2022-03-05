import Configuration from "../../../config-files/constants";
import { Service, DBPersistence } from "../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { FinancialTransaction } from "../payment/entities/financialtransaction";
import { FinancialTransactionState } from "../payment/enums";
import { UserManagerService } from "../usermanager/usermanager.service";
import { UserHistory } from "./history";


@Service()
export class HistoryService
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(private userService:UserManagerService){}

    addHistory(user:Customer, history:UserHistory)
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.findHistory(user,history.serviceTransportID)
            .then((result:ActionResult)=>{
                if(result.result.length>0)
                {
                    result.resultCode=ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                    return Promise.reject(result);
                }
                return  this.db.updateInCollection(
                    Configuration.collections.user,
                    {"_id":user.id.toString()},
                    {
                        $push:{"histories":history.toString()}
                    })
            })
            .then((result:ActionResult)=>resolve(result))
            .catch((result:ActionResult)=>reject(result));
        })
    }

    updateHistory(user:Customer):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{

        })
    }
    updateTransactionState(user:Customer,idService:EntityID,state:{state:FinancialTransactionState,endDate:String}):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.requestservice,
            {
                "_id":user._id.toString(),
                "histories.serviceTransportID":idService.toString()
            },
            {
                $set:{ 
                    "histories.$.financialTransaction.financialTransaction.state":state.state,
                    "histories.$.financialTransaction.financialTransaction.endDate":state.endDate
                }
            });
    }
    updateTransaction(user:Customer,idService:EntityID,toUpdate:Record<string,any>):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.user,
            {
                "_id":user.id.toString(),
                "histories.serviceTransportID":idService.toString()
            },
            {
                $set:{ 
                    "histories.$.financialTransaction":toUpdate,
                }
            });
    }

    findHistory(user:Customer,idService:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findDepthInCollection(
                Configuration.collections.user,
                [
                    {
                        "$match":{
                            "_id":user.id.toString()
                        }
                    },
                    {
                        "$unwind":"$histories"
                    },
                    {
                        "$match":{
                            "histories.serviceTransportID":idService.toString()
                        }
                    },
                    {
                        "$replaceRoot":{
                            "newRoot":"$histories"
                        }
                    }
                ]
            ).then((result:ActionResult)=>{
                if(result.result.length==0) 
                { 
                    result.result=[];
                    return resolve(result);
                }
                let history=new UserHistory(new EntityID());
                history.hydrate(result.result[0]);
                result.result=[history]
                resolve(result);
            })
            .catch((error:ActionResult)=>{
                error.result=null;
                reject(error);
            })
        })
    }
    findHistoryByRefTransaction(userID:EntityID,ref:number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findDepthInCollection(
                Configuration.collections.user,
                [
                    {
                        "$match":{
                            "_id":userID.toString()
                        }
                    },
                    {
                        "$unwind":"$histories"
                    },
                    {
                        "$match":{
                            "histories.financialTransaction.financialTransaction.ref":`${ref}`
                        }
                    },
                    {
                        "$replaceRoot":{
                            "newRoot":"$histories"
                        }
                    }
                ]
            ).then((result:ActionResult)=>{

                if(result.result.length==0)
                {
                    result.result=null;
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    return reject(result)
                }
                let history=new UserHistory(new EntityID());
                history.hydrate(result.result[0]);
                result.result=history
                resolve(result);
            })
            .catch((error:ActionResult)=>{
                error.result=null;
                reject(error);
            })
        })
    }
    checkExistHistory(user:Customer,idService:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.findHistory(user,idService)
            .then((result:ActionResult)=>{
                if(result.result.length>0) return resolve(result);
                reject(result)
            }).catch((result:ActionResult)=> reject(result) )
        })
    }
}