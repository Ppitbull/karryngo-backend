"use strict";
/**
@author: Cedric nguendap
@description: classe  permetant de faire le routage entre les url et modules appelé et ainsi que les
    methode a executer
@modified by Cedric Nguendap At 10/10/2020
@created: 22/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterService = void 0;
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
const KarryngoRoutingException_1 = require("../exception/KarryngoRoutingException");
const DynamicLoader_1 = require("../utils/DynamicLoader");
const injector_container_1 = require("../lifecycle/injector_container");
class RouterService extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor(config, routerChecker, frouter) {
        super();
        /**
         * @type Route[]
         * @description stocke la liste de toutes les routes définis dans le
         *  fichier de configuration des routes
         */
        this.routes = [];
        this.configService = config;
        this.frameworkRouter = frouter;
        this.routerChecker = routerChecker;
    }
    /***
     *@see SerializableEntity.toString()
     */
    toString() { }
    /**
     * @see SerializableEntity.hydrate()
     */
    hydrate(entity) { }
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
    run() {
        //pour chaque route présent dans la liste des routes
        for (let route of this.routes) {
            //on charge dynamiquement du module/controlleur associer et par le biais du container de dépendance
            //on injecte toutes les dépendances néccessaire au module
            let controller = injector_container_1.InjectorContainer.getInstance().getInstanceOf(route.module);
            //pour chaque method on appelle l'action associer en lui passant l'object requete et reponse
            for (let action of route.actions) {
                this.frameworkRouter[action.method.toString()](route.url.toString(), (req, res, next) => {
                    this.routerChecker.checkSecurity(route, action, req, res, next);
                }, (req, res) => {
                    DynamicLoader_1.DynamicLoader.call(controller, action.action, [req, res]);
                });
            }
        }
    }
    /**
     *
     * @param route
     * @description permet d'ajouter une nouvelle route
     */
    addRoute(route) {
        this.routes.push(route);
    }
    /**
     * @description permet d'obtenir la liste de toutes les routes lu dans le fichiers des routes
     * @returns listes des routes
     */
    getRouteList() {
        return this.routes;
    }
    /**
     * @description permet d'obtenir une route a partir de son url
     * @param url url de la route
     * @returns route qui correspond a l'url passé en parametre
     * @throws new KarryngoRoutingException() si aucune route correspondante a l'url n'est trouvé
     */
    getRouteByUrl(url) {
        let route = this.routes.find((rte) => rte.url == url);
        if (route == undefined)
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ROUTE_NOT_FOUND, `impossible de trouver la route d'url ${url}`);
        return route;
    }
}
exports.RouterService = RouterService;
//# sourceMappingURL=RouterService.js.map