/**
@author: Cedric nguendap
@description: Cette class represente une route carractérisé par son url le module 
    a appeler et l'action a exécuter
@created: 22/09/2020
*/

import { KarryngoRoutingException } from "../exception/KarryngoRoutingException";
import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { Action } from "./Action";

export class Route extends KarryngoApplicationEntity
{
    /**
     * @type String
     * @description represente l'url de l'api appeler pour une tache
     */
    protected _url:String="";

    /**
     * @type String
     * @description represente le module a appeler l'ors de l'execution d'un url.
     *  ce module doit être spécifier en tenant compte du chemin d'acces depuis la racine du 
     *  projet jusqua la classe a executer
     */
    protected _module:String="";

    /**
     * @type String
     * @description represente la methode qui est appelé (get,post,put,delete).
     */
    protected _actions:Action[]=[];

    protected _secure:Boolean=true;

    constructor(url:String="",module:String="",action:Action[]=[])
    {
        super();
        this.url=url;
        this.module=module;
        this.actions=action;
    }

    /***
     *@see SerializableEntity.toString()
     */
    toString():any{}

    /**
     * @see SerializableEntity.hydrate()
     */
    hydrate(entity:KarryngoEntity):void{}
    
    /**
     * @description setter de l'url
     * @param u url de la route
     */
    set url(u:String)
    {
        this._url=u;
    }

    /**
     * @description setter du module
     * @param mod: module a appeler
     */
    set module(mod:String)
    {
        this._module=mod;
    }

    
    /**
     * @description setter de la methode
     * @param act action a appeler
     */
    set actions(act:Action[])
    {
        this._actions=act;
    }

    set secure(sec:Boolean)
    {
        this._secure=sec;
    }

    /**
     * @description getter de l'url
     * @returns url de la route
     */
    get url():String
    {
        return this._url;
    }


    /**
     * @description getter du module
     * @returns module de la route
     */
    get module():String
    {
        return this._module;
    }

    /**
     * @description getter de l'action
     * @returns action de la route
     */
    get actions():Action[]
    {
        return this._actions;
    }

    isSecure():Boolean
    {
        return this._secure;
    }

    /**
     * @description permet d'obtenir la liste des methodes
     * @returns retournes la liste des methodes sous form de tableau de chaine de carractéres
     */
    getMethodList():String[]
    {
        return this._actions.map((action:Action)=> action.method);
    }

    /**
     * @description permet d'obtenir l'action dont la methode a été fournis en parametre
     * @param method methode dont on veut l'action 
     * @returns retourne l'action
     * @throws new KarryngoRoutingException() si l'action n'est pas définis ou si la 
     *  methode passé en parametre n'est pas trouvée
     */
    getActionForMethod(method:String):Action
    {
        let routeFind=this._actions.find((route:any)=> route.method=method);
        if(routeFind==undefined) throw new KarryngoRoutingException(KarryngoRoutingException.METHOD_NOT_FOUND,`method ${method} not found`);
        if(routeFind.action=="") throw new KarryngoRoutingException(KarryngoRoutingException.ACTION_NOT_FOUND,`no action found for method ${method}`);
        return routeFind;        
    }
    
}