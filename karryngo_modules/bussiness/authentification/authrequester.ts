/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des 
    demandeurs de service
@created 13/10/2020
*/

import { Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { AuthentificationService } from "../../services/authentification/authentification.service";
import { User } from "../../services/usermanager/entities/User";
import { UserManagerService } from "../../services/usermanager/usermanager.service";

@Controller()
export default class AuthRequester
{
    constructor (private autth:AuthentificationService,private userManagerService:UserManagerService) {}
    checkUserInformation(user:User):Boolean
    {
        let status:Boolean=false;
        return status;
    }
    register(request:any,response:any):void
    {
        let user=new User();
        user.firstname
        this.userManagerService.findUserByEmail(user.adresse.email)
            .then((data:ActionResult)=> 
            {
                //un utilisateur de ce nom existe déjà
                
            })
            .catch((error:ActionResult)=>
            {
                if(error.result==ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                {
                    //aucun utilisateur de ce nom existe dans la base de données
                    
                    this.userManagerService.saveUser(user)
                        .then((result:ActionResult)=>
                        {
                            //opération effectué avec success
                        })
                        .catch((error:ActionResult)=>
                        {
                            //response.status()
                            //echec de l'enregistrement de l'utilisateur
                        });
                }
            });
    }

    login(request:any,response:any):void
    {

    }
}