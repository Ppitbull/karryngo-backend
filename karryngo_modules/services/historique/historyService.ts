import Configuration from "../../../config-files/constants";
import { Service, DBPersistence } from "../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { FinancialTransaction } from "../toupesu/entities/financialtransaction";
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
            this.checkExistHistory(user,history.serviceTransportID)
            .then((result:ActionResult)=>{
                result.resultCode=ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                reject(result);
            })
            .catch((result:ActionResult)=>{
                if(result.resultCode!=ActionResult.RESSOURCE_NOT_FOUND_ERROR) return reject(result);
                this.db.updateInCollection(
                    Configuration.collections.user,
                    {"_id":user.id.toString()},
                    {
                        $push:{"histories":history.toString()}
                    })
                .then((result:ActionResult)=>resolve(result))
                .catch((error:ActionResult)=>reject(error));
            })
        })
    }

    updateHistory(user:Customer):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{

        })
    }

    updateTransaction(user:Customer,idService:EntityID,toUpdate:Record<string,any>):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.chat,
            {
                "_id":user.id,
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
            this.db.findInCollection(
                Configuration.collections.user,
                {
                    "_id":user.id.toString(),
                    "histories.serviceTransportID":idService.toString()
                },
            ).then((result:ActionResult)=>{
                if(result.result.length==0) 
                {
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result=null;
                    return reject(result);
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
    findHistoryByRefTransaction(ref:number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(
                Configuration.collections.user,
                {
                    "histories.financialTransaction.ref":ref
                }
            ).then((result:ActionResult)=>{
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
                if(result.result!=null) return resolve(result);
                reject(result)
            }).catch((result:ActionResult)=>reject(result))
        })
    }
}