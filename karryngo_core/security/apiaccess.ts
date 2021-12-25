/**
@author Cedric nguendap
@description Cette classe présente le service d'authentification basé sur le JWT
@created 18/10/2020
*/


import jsonwebtoken from "jsonwebtoken";
import { uid } from "rand-token";
import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService, KarryngoCore } from "../decorator";
import { ActionResult } from "../utils/ActionResult";

export enum ApiAccessError
{
    JsonWebTokenError="JsonWebTokenError",
    TokenExpiredError="TokenExpiredError"
}

@KarryngoCore()
export class ApiAccess
{
    @ConfigService()
    private configService:ConfigurableApp;
    

    /**
     * @description permet de vérifier l'existance d'un token parmis l'ensemble des tokens 
     *  stocké. si le token est trouvé alors il est dechiffer et retourner
     * @param token token dont on veu vérifier l'existance
     * @return {ActionResult} un resultat de success est retourné (muni du token déchiffer)
     *  si tout ce passe bien et un resultat d'échec dans le cas contraire
     */
    JWTLogin(token:String):Promise<ActionResult>
    {
        return this.textFromJWT(token);        
    }


    /**
     * @description permet de générer et retourner un token uitilisable par l'utilisateur. ce token 
     *  est également concerver
     * @param user utilisateur dont on veut sauvegarder le token
     * @return {ActionResult}  un resultat de success est retourné si tout ce passe bien.
     *  ce resultat est accompagné d'un token a utiliser pendans un nombre de temps configurer
     *  dans le fichier de configuration
     */
    JWTRegister(email:String,id:String):Promise<ActionResult>
    {
        return this.textToJWT(JSON.stringify({email,id}));
    }

    textToJWT(data:any):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let result:ActionResult=new ActionResult();
            jsonwebtoken.sign(
                {
                    exp: Math.floor(Date.now() / 1000) + this.configService.getValueOf("jwt").timeout,
                    data
                },
                this.configService.getValueOf('jwt').secret_key
                ,{
                    algorithm:this.configService.getValueOf('jwt').algorithm,                    
                },
            (err:any,token:any)=>
            {
                // console.log("jwt ",this.configService.getValueOf("jwt"),"data ",token,"error ",err);
                if(err)
                {
                    result.message=err.name;
                    result.description=err.message;
                    result.resultCode=ActionResult.UNKNOW_ERROR;
                    result.description=err;
                    reject(result);
                }
                else
                {
                    result.result={token,refresh_token:uid(256)}
                    resolve(result);
                }
            });
        });
    }

    textFromJWT(token:String):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let result:ActionResult=new ActionResult();
            jsonwebtoken.verify(token.toString(),this.configService.getValueOf("jwt").secret_key,{
                algorithms:[this.configService.getValueOf("jwt").algorithm]
            },(err,decoded)=>{
                if(err)
                {
                    result.message=`${err.name}`;
                    result.description=err.message;
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    reject(result);
                }
                else
                {
                    result.result=decoded;
                    resolve(result);
                }
            });
        })
    }
}