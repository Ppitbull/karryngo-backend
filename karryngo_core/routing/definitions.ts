import { Constructor } from "../lifecycle/type.interface";

export type HttpMethod=
    "GET" |
    "get" | 
    "POST"|
    "post"| 
    "PUT" |
    "put" | 
    "DELETE"|
    "delete";


    export interface ActionInterface
    {
        method:HttpMethod,
        params?:object,
        action:string
        isSecure?:boolean
    }

    
export interface RouteInterface
{
    url:string,
    module:Constructor,
    isSecure?:boolean,
    actions:ActionInterface[]
}
    