import { KarryngoPersistenceManagerFactory } from "../karryngo_core/persistence/KarryngoPersistenceManagerFactory";
import { PersistenceManager } from "../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../karryngo_core/utils/ActionResult";

export class DeployDataBase
{
    private db:any=null;
    private persistanceManager:PersistenceManager;
    constructor(persistanceManagerFactory:KarryngoPersistenceManagerFactory)
    {
        this.persistanceManager=persistanceManagerFactory.getInstance();
    }

    private createDataBase(dbname:String)
    {

    }

    private dropDataBase():Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let result:ActionResult=new ActionResult();
            this.db.dropDataBase((err:any,r:any)=>{
                if(err) {
                    result.message="Cannot drop database";
                    result.result=err;
                    reject(result);
                }
                else
                {
                    result.result=r;
                    resolve(result);
                }
            })
        })
    }
}