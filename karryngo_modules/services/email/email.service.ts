import { Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Email } from "./entities/email";

@Service()
export class EmailService
{
    send(email:Email):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }
}