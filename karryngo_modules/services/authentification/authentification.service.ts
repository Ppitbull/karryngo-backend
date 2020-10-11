import { Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { KarryngoService } from "../../karryngo.service";
import { User } from "../usermanager/entities/User";
import { UserManagerService } from "../usermanager/usermanager.service";

@Service()
export class AuthentificationService extends KarryngoService
{
    constructor(private userManagerService:UserManagerService){
        super();
    }

    register(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    login(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

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