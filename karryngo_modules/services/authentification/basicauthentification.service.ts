import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { User } from "../usermanager/entities/User";
import { UserManagerService } from "../usermanager/usermanager.service";

@Service()
@DBPersistence()
export class BasicAuthentificationService
{
    protected db:any={};
    constructor(private userManagerService:UserManagerService){}

    register(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.userManagerService.findUserByEmail(user.adresse.email)
            .then((data:ActionResult)=> this.userManagerService.newUser(user) )
            .then((data:ActionResult) => resolve(data))
            .catch((err:ActionResult)=> reject(err));
        });
    }

    login(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.db.getQueryBuilder(user).findOne({"adresse.email":user.adresse.email,password:user.password},(err:any,data:any)=>
            {
                let result=new ActionResult();
                if(err)
                {
                    result.message="Error";
                    result.description=err;
                    result.resultCode=ActionResult.UNKNOW_ERROR;
                    reject(result);
                }
                else if(data==null || data==undefined || data.length==0) 
                {
                    result.description="No data found";
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result=null;
                    reject(result);
                }
                else
                {
                    let p:User=new User();
                    p.hydrate(data.toObject({ virtuals: true }));
                    result.result=p;
                    resolve(result);
                }

            })
        });
    }

    forgotPassword(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    verifyEmail(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            
        });
    }
}