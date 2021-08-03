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
    
    private _header:Record<string | number,string>={}; 
    private _status:number=200;
    private _statusText:String='OK';
    private _config:Record<string | number,string>={};
    private _data:any={};
    private _request:Record<string | number,string>={}; 

    
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
           config:this._config,
           header:this._header,
            status:this._status,
            data:this._data
        }
    }

    hydrate(entity: KarryngoEntity): void {
        
    }

    getData():any
    {
        return this._data
    }
}
