import { resolve } from "path";
import Configuration from "../../config-files/constants";
import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { ConfigService, DBPersistence, KarryngoCore } from "../decorator";
import { KarryngoPersistentEntity } from "../persistence/KarryngoPersistentEntity";
import { PersistenceManager } from "../persistence/PersistenceManager.interface";
import { ActionResult } from "../utils/ActionResult";
import { ApiAccess } from "./apiaccess";

class Tokens extends KarryngoPersistentEntity
{
    access:String="";
    refresh:String="";
    toString()
    {
        return {
            ...super.toString(),
            access:this.access,
            refresh:this.refresh
        }
    }
}


@KarryngoCore()
export class TokenAuthentification
{
    @DBPersistence()
    private db:PersistenceManager;

    @ConfigService()
    private configService:ConfigurableApp;


    private tokenStorage:Map<String,{access:String,date:String}>=new Map<String,{access:String,date:String}>()

    constructor(
        private apiAccess:ApiAccess
    ){}

    getAccessTokenByRefresToken(refreshToken:String):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            // this.db.findInCollection(Configuration.collections.tokens,{refresh:refreshToken})
            // .then((data:ActionResult)=>{
            //     if(data.result.length==0) 
            //     {
            //         data.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            //         reject(data);
            //     }
            //     else 
            //     {
            //         data.result=data.result[0];
            //         resolve(data);
            //     }
            // })
            let result:ActionResult=new ActionResult();
            if(this.tokenStorage.has(refreshToken)) 
            {
                result.result={...this.tokenStorage.get(refreshToken),refresh:refreshToken};
                return resolve(result);
            }
            result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            reject(result);

        })
    }

    isValidRefreshToken(refreshToken:String,textToken,dateCreated:string):Boolean
    {
        let now=new Date();
        let tokenDate=new Date(dateCreated);
        // console.log("Date ",now,tokenDate,textToken)
        tokenDate.setHours(tokenDate.getSeconds()+this.configService.getValueOf("jwt").refresh_timeout)
        if(tokenDate<now) return false;
        return true;
    }

    setTokens(tokens:{access:String,refresh:String},lastRefresh:String=""):Promise<ActionResult>
    {
        // let newToken=new Tokens();
        // newToken.access=tokens.access;
        // newToken.refresh=tokens.refresh
        // return this.db.addToCollection(Configuration.collections.tokens,newToken)

        return new Promise<ActionResult>((resolve,reject)=>{
            this.tokenStorage.delete(lastRefresh)
            this.tokenStorage.set(tokens.refresh,{access:tokens.access,date:new Date().toISOString()});
            resolve(new ActionResult())
        })
    }

    updateToken(refreshToken:String,newToken:String):Promise<ActionResult>
    { 
        // return this.db.updateInCollection(Configuration.collections.tokens,{refresh:refreshToken},{access:newToken});
        return new Promise<ActionResult>((resolve,reject)=>{
            if(this.tokenStorage.has(refreshToken))
            {
                this.tokenStorage.set(refreshToken,{access:newToken,date:new Date().toISOString()});
                return resolve(new ActionResult())
            }
            let error:ActionResult=new ActionResult();
            error.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            reject(error);
        })
    }


}