import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { User } from "../usermanager/entities/User";
import { UserManagerService } from "../usermanager/usermanager.service";

@Service()
@DBPersistence()
export class AuthentificationService
{
    protected db:Partial<PersistenceManager>={};
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
            //this.db.getQueryBuilder(user).find().where()
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