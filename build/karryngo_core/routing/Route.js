"use strict";
/**
@author: Cedric nguendap
@description: Cette class represente une route carractérisé par son url le module
    a appeler et l'action a exécuter
@created: 22/09/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const KarryngoRoutingException_1 = require("../exception/KarryngoRoutingException");
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
class Route extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor(url = "", module, action = []) {
        super();
        /**
         * @type String
         * @description represente l'url de l'api appeler pour une tache
         */
        this._url = "";
        /**
         * @type String
         * @description represente la methode qui est appelé (get,post,put,delete).
         */
        this._actions = [];
        this._secure = true;
        this.url = url;
        this.module = module;
        this.actions = action;
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
     * @description setter de l'url
     * @param u url de la route
     */
    set url(u) {
        this._url = u;
    }
    /**
     * @description setter du module
     * @param mod: module a appeler
     */
    set module(mod) {
        this._module = mod;
    }
    /**
     * @description setter de la methode
     * @param act action a appeler
     */
    set actions(act) {
        this._actions = act;
    }
    set secure(sec) {
        this._secure = sec;
    }
    /**
     * @description getter de l'url
     * @returns url de la route
     */
    get url() {
        return this._url;
    }
    /**
     * @description getter du module
     * @returns module de la route
     */
    get module() {
        return this._module;
    }
    /**
     * @description getter de l'action
     * @returns action de la route
     */
    get actions() {
        return this._actions;
    }
    isSecure() {
        return this._secure;
    }
    /**
     * @description permet d'obtenir la liste des methodes
     * @returns retournes la liste des methodes sous form de tableau de chaine de carractéres
     */
    getMethodList() {
        return this._actions.map((action) => action.method);
    }
    /**
     * @description permet d'obtenir l'action dont la methode a été fournis en parametre
     * @param method methode dont on veut l'action
     * @returns retourne l'action
     * @throws new KarryngoRoutingException() si l'action n'est pas définis ou si la
     *  methode passé en parametre n'est pas trouvée
     */
    getActionForMethod(method) {
        let routeFind = this._actions.find((route) => route.method = method);
        if (routeFind == undefined)
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.METHOD_NOT_FOUND, `method ${method} not found`);
        if (routeFind.action == "")
            throw new KarryngoRoutingException_1.KarryngoRoutingException(KarryngoRoutingException_1.KarryngoRoutingException.ACTION_NOT_FOUND, `no action found for method ${method}`);
        return routeFind;
    }
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map