import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { KarryngoService } from "../../karryngo.service";
import { Email } from "./entities/email";

export class EmailService extends KarryngoService
{
    send(email:Email):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }
}