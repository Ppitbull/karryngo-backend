import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { Service, ConfigService } from "../../../karryngo_core/decorator";
import { RestApi } from "../../../karryngo_core/http/client/restapi";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Location } from "./../geolocalisation/entities/location"

@Service()
export class GDistanceMatrice
{
    @ConfigService()
    private configService:ConfigurableApp;
    private configMap:{key?:string}={};
    
    constructor(private request:RestApi)
    {
        this.configMap = {
            key:this.configService.getValueOf("googleapis").apikey
        };
    } 


    getDistanceBeetween(a:Location,b:Location,transportType:String):Promise<ActionResult>
    {
        let r:ActionResult=new ActionResult();
        r.result=[];
        return new Promise<ActionResult>((resolve,reject)=>{
            // this.request
            // .request()
            // .get("https://maps.googleapis.com/maps/api/distancematrix/json",
            //     { 
            //         params: { 
            //             key: this.configMap.key 
            //         } 
            //     }
            // )
            // .then((result:any)=>{
            //         let data=result.data.json;
            //         if(data.status!="OK")
            //         {
            //             r.resultCode=ActionResult.UNKNOW_ERROR
            //             r.result=data.error_message;
            //             reject(r);
            //             return;
            //         }
            //         if(data.rows.length>0) r.result=[data.rows[0].element];
            //     resolve(r);
            // })
            // .catch((error:any)=>{
            //     r.resultCode=ActionResult.UNKNOW_ERROR;
            //     r.result=error;
            // })
        })
    }
}