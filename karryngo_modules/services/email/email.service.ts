import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Email } from "./entities/email";
import nodemailer from "nodemailer";
import { Service, ConfigService } from "../../../karryngo_core/decorator";

@Service()
export class EmailService
{
    @ConfigService()
    private configService:ConfigurableApp;
    
    send(email:Email):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let sender=nodemailer.createTransport({
                host:this.configService.getValueOf('mail').host,
                auth:this.configService.getValueOf('mail').auth
            });
            sender.sendMail(email.toString(),(error,infos)=>{
                let result:ActionResult=new ActionResult();
                if(error) {
                    result.resultCode=ActionResult.UNKNOW_ERROR;
                    result.result=error;
                    reject(result);
                }
                else resolve(result);
            })
        });
    }
}