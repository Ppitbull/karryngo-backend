/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des 
    demandeurs de service
@created 13/10/2020
*/

import { Request, Response } from "express";
import { ApiAccess } from "../../../karryngo_core/security/apiaccess";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { BasicAuthentificationService } from "../../services/authentification/basicauthentification.service";
import { RealTimeChatManager } from "../chat/chat-realtimemanager";
import { User } from "../../services/usermanager/entities/User";
import { UserManagerService } from "../../services/usermanager/usermanager.service";
import { Customer } from "./entities/customer";
import { ServiceRequester } from "./entities/servicerequester";
import { Controller } from "../../../karryngo_core/decorator";

@Controller()
export default class AuthRequester
{
    constructor (
        private auth:BasicAuthentificationService,
        private userManagerService:UserManagerService,
        private jwtAuth:ApiAccess) {}
        
    checkUserInformation(user:Customer):Boolean
    {
        let status:Boolean=false;
        return status;
    }
    register(request:Request,response:Response):void
    {
        let user=new Customer();
        user.hydrate(request.body)
        this.userManagerService.findUserByEmail(user.adresse.email)
            .then((data:ActionResult)=> 
            {
                //un utilisateur de ce nom existe déjà
                let result:ActionResult=new ActionResult();
                result.description="User already exist";
                result.resultCode=ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                result.message="Error";
                return response.status(400).json(result);
                
            })
            .catch((error:ActionResult)=>
            {
                if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR)
                {
                    //aucun utilisateur de ce nom existe dans la base de données
                    this.userManagerService.newUser(user)
                        .then((result:ActionResult)=>
                        {
                            //opération effectué avec success
                            let r:ActionResult=new ActionResult();
                            r.description="Registration successful";
                            r.result=null;
                            return response.status(201).json(r);
                        })
                        .catch((error:ActionResult)=>
                        {
                            //response.status()
                            //echec de l'enregistrement de l'utilisateur
                            return response.status(400).json(error);
                        });
                }
                else return response.status(500).json(error);
            });
    }

    login(request:Request,response:any):void
    {
        let user:Customer=new Customer();
        user.adresse.email=request.body.email==undefined?"":request.body.email;
        user.password=request.body.password==undefined?"":request.body.password;
        console.log(request.body);
        this.auth.login(user)
        .then((data:ActionResult)=> this.jwtAuth.JWTRegister(user.adresse.email,data.result.id))
        .then((data:ActionResult)=>
        {
            data.description="Authentification successful";
            data.result={
                token:data.result
            }
            response.status(200).json(data);
        })
        .catch((data:ActionResult)=>
         {
             if(data.resultCode===ActionResult.RESSOURCE_NOT_FOUND_ERROR)
             {
                return response.status(403).json({
                    resultCode:data.resultCode,
                    message:"Incorrect email or password"
                })
             }
             else(data.resultCode===ActionResult.UNKNOW_ERROR)
             {
                return response.status(500).json({
                    resultCode:data.resultCode,
                    message:data.message
                });
             }
         })
    }

    getProfil(request:any,response:Response):void
    {
        let id:EntityID=new EntityID();
        id.setId(request.decoded.id)
        this.userManagerService.findUserById(id)
        .then((data:ActionResult)=>{
            // console.log("Provider: ",data);
            return response.status(200).json({
                resultCode:data.resultCode,
                result:data.result[0].toString()
            })
        }).catch((error:ActionResult)=>{
            return response.status(404).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }
    getUserProfil(request:any,response:Response):void
    {
        request.decoded.id=request.params.idProfil;
        this.getProfil(request,response);
    }

    resetPassword(request:any,response:Response):void
    {
        let user:User=new User();
        user.password=request.body.password;
        user.adresse.email=request.decoded.email
        this.auth.resetPassword(user)
        .then((result:ActionResult)=> {
            response.status(200).json({
                resultCode:result.resultCode,
                message:"password was updated successfully"
            });
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        });

    }
    forgotPassword(request:Request,response:Response):void
    {
        let user:User=new User();
        user.adresse.email=request.body.email;
        this.auth.forgotPassword(user)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:result.resultCode,
                message:"The link for reset password has been send by email"
            });
        })
        .catch((result:ActionResult)=>{
            if(result.resultCode===ActionResult.RESSOURCE_NOT_FOUND_ERROR)
             {
                return response.status(404).json({
                    resultCode:result.resultCode,
                    message:"User not found"
                })
             }
             else //(result.resultCode===ActionResult.UNKNOW_ERROR)
             {
                return response.status(500).json({
                    resultCode:result.resultCode,
                    message:result.message
                });
             }
        })
    }
}