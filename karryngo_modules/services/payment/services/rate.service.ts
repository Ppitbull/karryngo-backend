import Configuration from "../../../../config-files/constants";
import { DBPersistence, Service } from "../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Customer } from "../../../bussiness/authentification/entities/customer";
import { UserManagerService } from "../../usermanager/usermanager.service";
import { Wallet } from "../entities/wallet";
import { Rate } from "../entities/rate";

@Service()
export class RateService
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(private userService:UserManagerService){}

    addRate(rate){
        var rate_instance = new Rate();
        rate_instance.setAll(rate);
        rate_instance.setID(rate_instance._id);
        // console.log("dd", rate_instance)
        return this.db.addToCollection("Rates",rate_instance)
    }

    changeRate(rateID, rate: Rate):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            if(rate.owner<=0 || rate.provider<=0 || rate.manager<=0)
            {
                let result:ActionResult=new ActionResult();
                result.resultCode=ActionResult.INVALID_ARGUMENT;
                return reject(result)
            }
            this.getRate(rateID)
            .then((result:ActionResult)=>{
                var new_rate = new Rate(result.result[0]._id);
                // new_rate.setAll(rate);
                // console.log("rate: ", new_rate)
                // return
                return this.updateRate(result.result[0]._id, rate);
            })
            .then((result:ActionResult)=>resolve(result))
            .catch((error:ActionResult)=>reject(error));
        })
    }

    

    getRate(id):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection("Rates",{"_id":id})
            .then((res) => {
                resolve(res); 
            })
        })
    }


    getRateByCountry(countryID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection("Rates",{"countryID":countryID})
            .then((res) => {
                console.log("res ; ", res)
                resolve(res); 
            })
        })
        // return new Promise<ActionResult>((resolve,reject)=>{
        //     this.userService.findUserById(countryID)
        //     .then((result:ActionResult)=>{
        //         if(result.result.length==0)
        //         {
        //             result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
        //             result.result=null;
        //             return reject(result);
        //         }  
        //         let user:Customer=result.result[0];
        //         result.result=user.wallet;
        //         resolve(result);
        //     })
        //     .catch((error)=>reject(error))
        // })
    }

    updateRate(id, rate:Rate):Promise<ActionResult>
    {
        return this.db.updateInCollection(
            Configuration.collections.rate,
            {
                "_id": id
            },
            {
                $set: rate
            }
        );
    }

}