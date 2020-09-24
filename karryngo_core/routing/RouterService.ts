/*
@author: Cedric nguendap
@description: classe  permetant de faire le routage entre les url et modules appelé et ainsi que les 
    methode a executer
@created: 22/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { KarryngoRoutingException } from "../exception/KarryngoRoutingException";
import { Route } from "./Route";
import { PersistenceManager } from "../persistence/PersistenceManager.interface";
import { DynamicLoader } from "../utils/DynamicLoader";

export class RouterService extends KarryngoApplicationEntity
{
    /**
     * @type Route[]
     * @description stocke la liste de toutes les routes définis dans le 
     *  fichier de configuration des routes
     */
    protected routes:Route[]=[];

    /**
     * @type ConfigurableApp
     * @description sera injecté a partir du constructeur et contiendra l'objet de configuration
     */
    protected configService:ConfigurableApp;

    protected frameworkRouter:any;
    
    constructor(config:ConfigurableApp,frouter:any)
    {
        super();
        this.configService=config;
        this.frameworkRouter=frouter;
        this.readRouteFromConfiguration();
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
     * @description permet de lire les routes recus depuis le fichier de configuration
     *  des routes et pour chaque route vérifier qu'il est conforme et l'enregistrer dans 
     *  le tableau des routes
     * 
     * @throws new KarryngoRoutingException() 
     *  si une informations (module,url,actions) est manquante
     *  pour l'etablissement correct de la route
     *  si dans le tableau des actions un parametre (action, method) n'est pas spécifier
     * 
     */
    protected readRouteFromConfiguration()
    {
        let objRoute=this.configService.getValueOf('routes');
        if(!(objRoute instanceof Array)) throw new KarryngoRoutingException(KarryngoRoutingException.BAD_ROUTE_CONFIGURATION,"bad definition of file configuration of route");
        for(let route of objRoute)
        {
            if(!route.hasOwnProperty('url') || !route.hasOwnProperty('module') || !route.hasOwnProperty('actions'))
            {
                let notFoundKey=route.hasOwnProperty('url')?
                    ( route.hasOwnProperty('module')?
                        ( route.hasOwnProperty('actions')?
                            '':
                            'actions'
                        ) :'module' 
                    ): 'url';
                throw new KarryngoRoutingException(KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND,`key ${notFoundKey} not found in route ${route} `)
            }
            route.actions.forEach((routeAction:any) => 
            {
                if(!routeAction.hasOwnProperty('method'))    
                {
                    throw new KarryngoRoutingException(KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND,`key 'method' not found in action ${routeAction} `)
                }
                if(!routeAction.hasOwnProperty('action'))    
                {
                    throw new KarryngoRoutingException(KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND,`key 'action' not found in action ${routeAction} `)
                }
            });
            this.addRoute(new Route(route.url,route.module,route.actions));
        }
    }
    /**
     * @description permet de spécifier au frameword (express) l'ensemble des routes
     *  existante dans l'application ainsi que les controlleurs et les actions a appéler pour
     *  chaque methode (get,put,post,delete) 
     */
    run(persistence:PersistenceManager)
    {        
        //pour chaque route présent dans la liste des routes
        for(let route of this.routes)
        {
            //on charge dynamiquement du module/controlleur associer
            let controller=DynamicLoader.load(route.module,[persistence,this.configService]);
            //pour chaque method on appelle l'action associer en lui passant l'object requete et reponse
            for(let method of route.getMethodList())
            {
                DynamicLoader.call(this.frameworkRouter,route.url,[(req:any,res:any)=>
                    {
                        DynamicLoader.call(controller,route.getActionForMethod(method),[req,res]);
                    }
                ])
            }
        }
    }

    /**
     * 
     * @param route 
     * @description permet d'ajouter une nouvelle route
     */
    protected addRoute(route:Route):void
    {
        this.routes.push(route);
    }

    /**
     * @description permet d'obtenir la liste de toutes les routes lu dans le fichiers des routes
     * @returns listes des routes
     */
    getRouteList():Route[]
    {
        return this.routes;
    }

    /**
     * @description permet d'obtenir une route a partir de son url
     * @param url url de la route
     * @returns route qui correspond a l'url passé en parametre
     * @throws new KarryngoRoutingException() si aucune route correspondante a l'url n'est trouvé
     */
    getRouteByUrl(url:String):any
    {
        let route=this.routes.find((rte:Route)=>rte.url==url);
        if(route==undefined) throw new KarryngoRoutingException(KarryngoRoutingException.ROUTE_NOT_FOUND,`impossible de trouver la route d'url ${url}`);
        return route;
    }
}