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
export class KResponse extends KarryngoApplicationEntity
{
    
    _header:Record<string | number,string>={}; 
    _status:number=200;
    _statusText:String='OK';
    _config:Record<string | number,string>={};
    _data:Record<string | number,string>={};
    _request:Record<string | number,string>={}; 

    
    header(key:string,value:any):KResponse
    {
        this._header[key]=value;
        return this;
    }
    headers(headers:Record<string | number,string>={}):KResponse
    {
        this._header={...this._header,...headers}
        return this;
    }
    data(data:any):KResponse
    {
        this._data=data;
        return this;
    }
    status(status:number):KResponse
    {
        this._status=status;
        return this;
    }
    statusText(statusText:String):KResponse
    {
        this._statusText=statusText
        return this;
    }
    config(conf:Record<string | number,string>={}):KResponse
    {
        this._config=conf;
        return this;
    }
   
    toString() 
    {
        return {
           
        }
    }

    hydrate(entity: KarryngoEntity): void {
        
    }
}
