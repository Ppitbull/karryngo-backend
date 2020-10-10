"use strict";
/**
@author: Cedric nguendap
@description: classe  permetant de faire le routage entre les url et modules appelé et ainsi que les
    methode a executer
@created: 22/09/2020
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterService = void 0;
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var KarryngoRoutingException_1 = require("../exception/KarryngoRoutingException");
var Route_1 = require("./Route");
var DynamicLoader_1 = require("../utils/DynamicLoader");
var RouterService = /** @class */ (function (_super) {
    __extends(RouterService, _super);
    function RouterService(config, frouter) {
        var _this = _super.call(this) || this;
        /**
         * @type Route[]
         * @description stocke la liste de toutes les routes définis dans le
         *  fichier de configuration des routes
         */
        _this.routes = [];
        _this.configService = config;
        _this.frameworkRouter = frouter;
        _this.readRouteFromConfiguration();
        return _this;
    }
    /***
     *@see SerializableEntity.toString()
     */
    RouterService.prototype.toString = function () { };
    /**
     * @see SerializableEntity.hydrate()
     */
    RouterService.prototype.hydrate = function (entity) { };
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
    RouterService.prototype.readRouteFromConfiguration = function () {
        //obtention du tableau des routes dans le fichier de configuraiton routes.json
        var objRoute = this.configService.getValueOf('routes');
        //si les routes ne sont pas dans un tableau alors on lance une erreur
        if (!(objRoute instanceof Array))
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.BAD_ROUTE_CONFIGURATION, "bad definition of file configuration of route");
        //pour chaque unité de routage contenu dans le tableau des routes
        for (var _i = 0, objRoute_1 = objRoute; _i < objRoute_1.length; _i++) {
            var route = objRoute_1[_i];
            //si une propriété de la route est manquante (url,module,actions) alors on génére
            //une erreur avec un message approprié
            if (!route.hasOwnProperty('url') || !route.hasOwnProperty('module') || !route.hasOwnProperty('actions')) {
                var notFoundKey = route.hasOwnProperty('url') ?
                    (route.hasOwnProperty('module') ?
                        (route.hasOwnProperty('actions') ?
                            '' :
                            'actions') : 'module') : 'url';
                throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND, "key " + notFoundKey + " not found in route " + route + " ");
            }
            //pour chaque action trouvé dans l'ensemble des actions de chaque  url
            //si une propriété de l'action est innéxistante, on lance une exception
            route.actions.forEach(function (routeAction) {
                if (!routeAction.hasOwnProperty('method')) {
                    throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND, "key 'method' not found in action " + routeAction + " ");
                }
                if (!routeAction.hasOwnProperty('action')) {
                    throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ROUTE_PARAM_NOT_FOUND, "key 'action' not found in action " + routeAction + " ");
                }
            });
            this.addRoute(new Route_1.Route(route.url, route.module, route.actions));
        }
    };
    /**
     * @description permet de spécifier au frameword (express) l'ensemble des routes
     *  existante dans l'application ainsi que les controlleurs et les actions a appéler pour
     *  chaque methode (get,put,post,delete)
     */
    RouterService.prototype.run = function (persistence) {
        var _loop_1 = function (route) {
            //on charge dynamiquement du module/controlleur associer
            var controller = DynamicLoader_1.DynamicLoader.load(route.module, [persistence, this_1.configService]);
            var _loop_2 = function (method) {
                DynamicLoader_1.DynamicLoader.call(this_1.frameworkRouter, route.url, [function (req, res) {
                        DynamicLoader_1.DynamicLoader.call(controller, route.getActionForMethod(method), [req, res]);
                    }
                ]);
            };
            //pour chaque method on appelle l'action associer en lui passant l'object requete et reponse
            for (var _i = 0, _a = route.getMethodList(); _i < _a.length; _i++) {
                var method = _a[_i];
                _loop_2(method);
            }
        };
        var this_1 = this;
        //pour chaque route présent dans la liste des routes
        for (var _i = 0, _a = this.routes; _i < _a.length; _i++) {
            var route = _a[_i];
            _loop_1(route);
        }
    };
    /**
     *
     * @param route
     * @description permet d'ajouter une nouvelle route
     */
    RouterService.prototype.addRoute = function (route) {
        this.routes.push(route);
    };
    /**
     * @description permet d'obtenir la liste de toutes les routes lu dans le fichiers des routes
     * @returns listes des routes
     */
    RouterService.prototype.getRouteList = function () {
        return this.routes;
    };
    /**
     * @description permet d'obtenir une route a partir de son url
     * @param url url de la route
     * @returns route qui correspond a l'url passé en parametre
     * @throws new KarryngoRoutingException() si aucune route correspondante a l'url n'est trouvé
     */
    RouterService.prototype.getRouteByUrl = function (url) {
        var route = this.routes.find(function (rte) { return rte.url == url; });
        if (route == undefined)
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ROUTE_NOT_FOUND, "impossible de trouver la route d'url " + url);
        return route;
    };
    return RouterService;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.RouterService = RouterService;
