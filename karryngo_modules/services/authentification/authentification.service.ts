import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { KarryngoService } from "../../karryngo.service";
import { User } from "../usermanager/entities/User";

export class AuthentificationService extends KarryngoService
{
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