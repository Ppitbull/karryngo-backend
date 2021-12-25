import { KarryngoCore } from "../decorator/core.decorator";
import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { ApiAccess, ApiAccessError } from "../security/apiaccess";
import { TokenAuthentification } from "../security/tokentauthentification.service";
import { ActionResult } from "../utils/ActionResult";
import { Action } from "./Action";
import { Route } from "./Route";

@KarryngoCore()
export class RouterChecker extends KarryngoApplicationEntity
{
    constructor (
        private apiAccess:ApiAccess,
        )
    {
        super();
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }
    
    checkApiAccess(token:String):Promise<ActionResult>
    {
        return this.apiAccess.JWTLogin(token);
    }
    
    //pour s'asssurer que l'url existe
    checkMethod()
    {

    }

    /**
     * @description cette methode permet de verifier l'acces a l'api en se basant sur le token si une erreur
     *  une authentification est requise
     * @param route route en cours de traitement
     * @param method method que l'on désire exécuter
     * @param req objet representant la requete de l'utilisateur
     * @param res objet representant la reponse a retourner a l'utilisateur
     * @param {Function} next si tout est ok l'appel a cette fonction permet de poursuivre le t
     *  traitement de la requete
     */
    checkSecurity(route:Route,action:Action,req:any, res:any,next:any)
    {
        //si la route spécifi d'utiliser une authentification
        if(action.isSecure())
        {
            //recuperationj du token dans l'entête
            let token=req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
            
            //si le token existe on le traite sinon on retoune un objet d'érreure
            if(token)
            {
                if(token.startsWith('Bearer ')) token=token.slice(7,token.length);
                this.checkApiAccess(token)
                .then((data:ActionResult)=>
                {
                    req.decoded=JSON.parse(data.result.data);   
                    next();
                })
                .catch((data:ActionResult)=>
                {
                    let message:String="";
                    switch(data.message)
                    {
                        case ApiAccessError.JsonWebTokenError:
                            message=data.description;
                            data.resultCode=-2
                            break;
                        case ApiAccessError.TokenExpiredError: 
                            message="Token expired"
                            data.resultCode=-3
                    };
                    return res.status(401).json({
                        resultCode: data.resultCode,
                        message
                    });
                });
            }
            else return res.status(403).json({
                resultCode: -1,
                message: 'Auth token is not supplied'
                });
        }
        else
        {
            next();
        }
    }

}