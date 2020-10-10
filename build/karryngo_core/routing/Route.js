"use strict";
/**
@author: Cedric nguendap
@description: Cette class represente une route carractérisé par son url le module
    a appeler et l'action a exécuter
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
exports.Route = void 0;
var KarryngoRoutingException_1 = require("../exception/KarryngoRoutingException");
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route(url, module, action) {
        if (url === void 0) { url = ""; }
        if (module === void 0) { module = ""; }
        if (action === void 0) { action = {}; }
        var _this = _super.call(this) || this;
        /**
         * @type String
         * @description represente l'url de l'api appeler pour une tache
         */
        _this._url = "";
        /**
         * @type String
         * @description represente le module a appeler l'ors de l'execution d'un url.
         *  ce module doit être spécifier en tenant compte du chemin d'acces depuis la racine du
         *  projet jusqua la classe a executer
         */
        _this._module = "";
        /**
         * @type String
         * @description represente la methode qui est appelé (get,post,put,delete).
         */
        _this._actions = {};
        _this.url = url;
        _this.module = module;
        _this.actions = action;
        return _this;
    }
    /***
     *@see SerializableEntity.toString()
     */
    Route.prototype.toString = function () { };
    /**
     * @see SerializableEntity.hydrate()
     */
    Route.prototype.hydrate = function (entity) { };
    Object.defineProperty(Route.prototype, "url", {
        /**
         * @description getter de l'url
         * @returns url de la route
         */
        get: function () {
            return this._url;
        },
        /**
         * @description setter de l'url
         * @param u url de la route
         */
        set: function (u) {
            this._url = u;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "module", {
        /**
         * @description getter du module
         * @returns module de la route
         */
        get: function () {
            return this._module;
        },
        /**
         * @description setter du module
         * @param mod: module a appeler
         */
        set: function (mod) {
            this._module = mod;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Route.prototype, "actions", {
        /**
         * @description getter de l'action
         * @returns action de la route
         */
        get: function () {
            return this._actions;
        },
        /**
         * @description setter de la methode
         * @param act action a appeler
         */
        set: function (act) {
            this._actions = act;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @description permet d'obtenir la liste des methodes
     * @returns retournes la liste des methodes sous form de tableau de chaine de carractéres
     */
    Route.prototype.getMethodList = function () {
        return this._actions.map(function (action) { return action.method; });
    };
    /**
     * @description permet d'obtenir l'action dont la methode a été fournis en parametre
     * @param method methode dont on veut l'action
     * @returns retourne l'action
     * @throws new KarryngoRoutingException() si l'action n'est pas définis ou si la
     *  methode passé en parametre n'est pas trouvée
     */
    Route.prototype.getActionForMethod = function (method) {
        var routeFind = this._actions.find(function (route) { return route.method = method; });
        if (routeFind == undefined)
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.METHOD_NOT_FOUND, "method " + method + " not found");
        if (!routeFind.hasOwnProperty('action'))
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ACTION_NOT_FOUND, "no action found for method " + method);
        return routeFind.action;
    };
    return Route;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.Route = Route;
