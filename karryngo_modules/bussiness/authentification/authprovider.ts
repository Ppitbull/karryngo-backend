/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des 
    fournisseur de service
@created 13/10/2020
*/

import { Request,Response } from "express";
import { Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { BasicAuthentificationService } from "../../services/authentification/basicauthentification.service";
import { UserManagerService } from "../../services/usermanager/usermanager.service";
import { ProviderServiceManager } from "../service/providerservicemanager";
import { Customer } from "./entities/customer";
import { ServiceProvider } from "./entities/serviceprovider";

@Controller()
export class AuthProvider
{
    constructor (
        private auth:BasicAuthentificationService,
        private userManagerService:UserManagerService,
        private providerServiceManager:ProviderServiceManager) {}

    /**
     * Permet de senregistrer pour devenir fournisseurs de service
     * @param request 
     * @param response 
     */
    register(request:any,response:Response):void
    {
        // type: 0 personnel, 1 compagny
        let data:Record<string, any>=
        {
            isProvider:true,
            isCompany:false,
            passportNumber:request.body.passportNumber
        };
        let userId:EntityID=new EntityID();
        userId.setId(request.decoded.id);
        if(request.body.type==1)
        {
            data['companyName']=request.body.companyName,
            data['registrationNumber']=request.body.registrationNumber,
            data['importExportCompagnyCode']=request.body.importExportCompagnyCode;
            data['companyAddress']=request.body.companyAddress;
            data['isCompany']=true;
        }
        console.log("register provider")
        this.userManagerService.findUserById(userId)
        .then((dataResult:ActionResult)=>  this.userManagerService.saveUser(userId,data))        
        .then((data:ActionResult)=> this.providerServiceManager.addService(request,response))
        .catch((error:ActionResult)=>{
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) response.status(404).json({
                resultCode:error.resultCode,
                message: error.message
            })
            else response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }

    login(request:any,response:any):void
    {

    }
}