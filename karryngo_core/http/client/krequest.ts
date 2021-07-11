import { KarryngoCore } from "../../decorator/core.decorator";
import { KarryngoApplicationEntity } from "../../KarryngoApplicationEntity";
import { KarryngoEntity } from "../../KarryngoEntity";

export type Method =
  | 'get' | 'GET'
  | 'delete' | 'DELETE'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
  | 'purge' | 'PURGE'
  | 'link' | 'LINK'
  | 'unlink' | 'UNLINK'

@KarryngoCore()
export class KRequest extends KarryngoApplicationEntity
{
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }    
    headerData:Record<string | number,string>={}; 
    requestType:String="";
    dataObj:any=null;
    accesstoken:any=null;
    link:String="";
    method:Method='get';

    token(accesstoken:any):KRequest
    {
        this.accesstoken=accesstoken;
        return this;
    }

    get():KRequest
    {
        this.method="get";
        return this;
    }
    post():KRequest
    {
        this.method="post";
        return this;
    }
    put():KRequest
    {
        this.method="put";
        return this;
    }
    delete():KRequest
    {
        this.method="delete";
        return this;
    }
    header(key:string,value:any):KRequest
    {
        this.headerData[key]=value;
        return this;
    }
    data(data:any):KRequest
    {
        this.dataObj=data;
        return this;
    }
    url(link:String):KRequest
    {
        this.link=link;
        return this;
    }
    json():KRequest
    {
        this.headerData['Content-Type']="Content-Type': 'application/json";
        this.requestType="json";
        return this;
    }
    text():KRequest
    {
        this.requestType="text";
        return this;
    }
    xml():KRequest
    {
        this.requestType="xml";
        this.headerData['Content-Type']="Content-Type': 'application/xml";
        return this;
    }
    serializeDataToUrl():String
    {
        let endpoint=this.link.toString();
        if (this.dataObj) {
            let req: String = '';
            for (const key in this.dataObj) {
              req += `${key}=${this.dataObj[key]}&`;
            }
            endpoint +="?" + req;
        }
        return endpoint;
    }
    toString() 
    {
        return {
            url:this.link.toString(),
            method:this.method,
            data:this.dataObj,
            params:this.headerData
        }
    }
    
    
}
