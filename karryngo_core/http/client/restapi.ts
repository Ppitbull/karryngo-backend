/**
 * @description Cette classe est un outils pour acceder a tout api Rest et est basé sur le package
 *  axios (https://www.npmjs.com/package/axios) 
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
import { Http } from "../http";
import axios, { AxiosResponse } from 'axios';
import { KarryngoCore } from "../../decorator/core.decorator";
import { KRequest } from "./krequest";
import { ActionResult } from "../../utils/ActionResult";
import { KResponse } from "./kresponse";
import { KError } from "./kerror";

@KarryngoCore()
export class RestApi extends Http
{
    sendRequest(request:KRequest):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let actionResult=new ActionResult();
            axios(request.toString())
            .then((response:AxiosResponse)=>{
                actionResult.result=new KResponse()
                .status(response.status)
                .data(response.data)
                .statusText(response.statusText)
                .headers(response.headers);
                resolve(actionResult)
            })
            .catch((error)=>{
                console.log("Error 3",error)
                let kerror=new KError();
                kerror.response=new KResponse()
                .status(error.status)
                .data(error.data)
                .statusText(error.statusText)
                .headers(error.headers);
                actionResult.resultCode=ActionResult.UNKNOW_ERROR;
                
                reject(actionResult)
            })
        });
    }
}