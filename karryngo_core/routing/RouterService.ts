/**
@author: Cedric nguendap
@description: classe  permetant de faire le routage entre les url et modules appelé et ainsi que les 
    methode a executer
@modified by Cedric Nguendap At 10/10/2020
@created: 22/09/2020
*/

import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { KarryngoEntity } from "../KarryngoEntity";
import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { KarryngoRoutingException } from "../exception/KarryngoRoutingException";
import { Route } from "./Route";
import { PersistenceManager } from "../persistence/PersistenceManager.interface";
import { DynamicLoader } from "../utils/DynamicLoader";
import { InjectorContainer } from "../lifecycle/injector_container";
import Configuration from "./../../config-files/constants";
import { Action } from "./Action";
import { RouterChecker } from "./routerchecker";
import { ActionResult } from "../utils/ActionResult";

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
    configService:ConfigurableApp;

    frameworkRouter:any;

    routerChecker:RouterChecker;
    
    constructor(config:ConfigurableApp,routerChecker:RouterChecker,frouter:any)
    {
        super();
        this.configService=config;
        this.frameworkRouter=frouter;
        this.routerChecker=routerChecker;
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
    
    /**
     * @description permet de spécifier au frameword (express) l'ensemble des routes
     *  existante dans l'application ainsi que les controlleurs et les actions a appéler pour
     *  chaque methode (get,put,post,delete) 
     */
    run()
    {        
        //pour chaque route présent dans la liste des routes
        for(let route of this.routes)
        {
            //on charge dynamiquement du module/controlleur associer et par le biais du container de dépendance
            //on injecte toutes les dépendances néccessaire au module
            let controller=InjectorContainer.getInstance().getInstanceOf(route.module);
            
            //pour chaque method on appelle l'action associer en lui passant l'object requete et reponse
            for(let action of route.actions)
            {
                this.frameworkRouter[action.method.toString()](
                    route.url.toString(),
                    (req:any, res:any,next:any)=>{
                        this.routerChecker.checkSecurity(
                            route,
                            action,
                            req,
                            res,
                            next
                        );
                    },
                    (req:any,res:any)=>{
                        DynamicLoader.call(controller,action.action,[req,res]);
                    }
                );
            }
        }
    }

    /**
     * 
     * @param route 
     * @description permet d'ajouter une nouvelle route
     */
    addRoute(route:Route):void
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