/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des 
    fournisseur de service
@created 13/10/2020
*/

import { Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { BasicAuthentificationService } from "../../services/authentification/basicauthentification.service";

@Controller()
export class AuthProvider
{
    constructor (private auth:BasicAuthentificationService) {}

    register(request:any,response:any):void
    {
        
    }

    login(request:any,response:any):void
    {

    }
}