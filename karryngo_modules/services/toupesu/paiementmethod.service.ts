import Configuration from "../../../config-files/constants";
import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService, DBPersistence, Service } from "../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { UserManagerService } from "../usermanager/usermanager.service";
import { PaiementMethodEntity } from "./entities/paiementmethodentity";
import { PaiementStrategyType } from "./enums";

@Service()
export class PaiementMethodService 
{
    @DBPersistence()
    private db:PersistenceManager

    constructor(
        private userServiceManager:UserManagerService
    ){}

    addMethodPaiement(userID:EntityID,paiementMethod:PaiementMethodEntity):Promise<ActionResult>
    {
        return this.db.updateInCollection(
            Configuration.collections.user,
            {"_id":paiementMethod.id.toString()},
            {
                $push:{"paiementMethodList":paiementMethod.toString()}
            },
        )
    }

    removeMethodPaiement(userID:EntityID,paiementMethod:PaiementMethodEntity):Promise<ActionResult>
    {
        return this.db.removeToCollection(
                Configuration.collections.user,
                {
                    "_id":userID.toString(),
                },
                {
                    "paiementMethodList._id":paiementMethod.id.toString()
                }
            );
    }


    exitMethodePaiement(userID:EntityID,paiementMethodID:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.userServiceManager.findUserById(userID)
            .then((result:ActionResult)=>{
                let user:Customer=result.result;
                let m=user.paimentMethodList.find((method:PaiementMethodEntity)=>method.id.toString()==paiementMethodID.toString())
                if(m)
                {
                    result.result=true;
                    return resolve(result)
                }
                result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                result.result=false;
                reject(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }

    getMethodPaiementMethod(userID:EntityID,paiementMethodType:PaiementStrategyType):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.userServiceManager.findUserById(userID)
            .then((result:ActionResult)=>{
                let user:Customer=result.result;
                result.result=user.paimentMethodList.map((method:PaiementMethodEntity)=>method.type==paiementMethodType)
                return resolve(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }

    getAllPaiementMethod(userID:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.userServiceManager.findUserById(userID)
            .then((result:ActionResult)=>{
                let user:Customer=result.result;
                result.result=user.paimentMethodList
                return resolve(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }


}