import Configuration from "../../../config-files/constants";
import { ConfigService, DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ApiAccess } from "../../../karryngo_core/security/apiaccess";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EmailService } from "../email/email.service";
import { Email } from "../email/entities/email";
import { User } from "../usermanager/entities/User";
import { UserManagerService } from "../usermanager/usermanager.service";

@Service()
@DBPersistence()
@ConfigService()
export class BasicAuthentificationService
{
    protected db:any={};
    private configService:any={};

    constructor(
        private userManagerService:UserManagerService,
        private emailService:EmailService,
        private jwtAuth:ApiAccess){}

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
            this.db.findInCollection(Configuration.collections.user,{"address.email":user.adresse.email,"password":user.password},1)
            .then((data:ActionResult)=>
            {
                let result=new ActionResult();
                if(data.result.length==0) 
                {
                    result.description="No data found";
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result=null;
                    reject(result);
                }
                else
                {
                    
                    let p:User=new User();
                    
                    p.hydrate(data.result[0]);
                    result.result=p;
                    resolve(result);
                }

            })
            .catch((error:ActionResult)=> reject(error))
        });
    }

    forgotPassword(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.userManagerService.findUserByEmail(user.adresse.email)
            .then((result:ActionResult)=>this.jwtAuth.JWTRegister(result.result[0].adresse.email,result.result[0].id.toString()))
            .then((result:ActionResult)=> this.emailService.send(
                new Email()
                .from(this.configService.getValueOf('mail').auth.user)
                .title("Recuperation de compte")
                .to(user.adresse.email)
                .htmlContent(`
                    <p>Ciquez  sur ce <a hrer="localhost?token=${result.result}">lien</a> pour modifier votre mot de passe<p> 
                    <p>${result.result}</p>
                `))
            )
            .then((result:ActionResult)=>resolve(result))
            .catch((error:ActionResult)=>reject(error))
        });
    }
    changePassword(user:User,newPassword:String):Promise<ActionResult>    
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.userManagerService.findUserByEmail(user.adresse.email)
            .then((result:ActionResult)=>{
                let user:User=result.result;
                if(user.password!=newPassword)
                {
                    result.message="The old password is not correct"
                    result.resultCode=ActionResult.INVALID_ARGUMENT;
                    result.result=null;
                    return Promise.reject(result);
                }
                user.password=newPassword;
                return this.resetPassword(user);
            })
            .then((result:ActionResult)=>resolve(result))
            .catch((error:ActionResult)=>reject(error));
        })
    }

    resetPassword(user:User):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.user,
                {"adresse.email":user.adresse.email},
                {
                    $set:{"password":user.password}
                }
        );
    }

    verifyEmail(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            
        });
    }
}