import Configuration from "../../../config-files/constants";
import { DBPersistence, Service } from "../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { UserManagerService } from "../usermanager/usermanager.service";
import { Wallet } from "./entities/wallet";

@Service()
export class WalletService
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(private userService:UserManagerService){}

    increaseWallet(userID:EntityID,amount:number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            if(amount<=0)
            {
                let result:ActionResult=new ActionResult();
                result.resultCode=ActionResult.INVALID_ARGUMENT;
                return reject(result)
            }
            this.getWallet(userID)
            .then((result:ActionResult)=>{
                let wallet:Wallet=result.result;
                wallet.increase(amount);
                return this.updateWallet(wallet);
            })
            .then((result:ActionResult)=>resolve(result))
            .catch((error:ActionResult)=>reject(error));
        })
    }

    decreaseWallet(userID:EntityID,amount:number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.getWallet(userID)
            .then((result:ActionResult)=>{
                let wallet:Wallet=result.result;
                if(!wallet.decrease(amount))
                {
                    result.resultCode=ActionResult.INVALID_ARGUMENT;
                    return Promise.reject(result)
                }
                return this.updateWallet(wallet);
            })
            .then((result:ActionResult)=>resolve(result))
            .catch((error:ActionResult)=>reject(error));
        })
    }

    getWallet(userID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.userService.findUserById(userID)
            .then((result:ActionResult)=>{
                if(result.result.length==0)
                {
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result=null;
                    return reject(result);
                }  
                let user:Customer=result.result[0];
                result.result=user.wallet;
                resolve(result);
            })
            .catch((error)=>reject(error))
        })

    }

    updateWallet(wallet:Wallet):Promise<ActionResult>
    {
        return this.db.updateInCollection(
            Configuration.collections.user,
            {
                "wallet._id":wallet.id
            },
            {
                "wallet.amount":wallet.amount
            }
        );
    }

}