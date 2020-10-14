import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Email } from "./entities/email";
import nodemailer from "nodemailer";

@Service()
@ConfigService()
export class EmailService
{
    private configService:any={};
    send(email:Email):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //let sender=nodemailer this.configService.getValueOf('mail'); 
        });
    }
}