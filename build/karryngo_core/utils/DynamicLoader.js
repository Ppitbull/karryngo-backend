"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicLoader = void 0;
/**
@author: Cedric nguendap
@description: Cette classe permet des faires des instanciations dynamique de classe et des appels dynamique
    de fonction
@created: 23/09/2020
*/
var KarryngoLoaderException_1 = require("../exception/KarryngoLoaderException");
var DynamicLoader = /** @class */ (function () {
    function DynamicLoader() {
    }
    /**
     * @description permet de charger dynamiquement une classe en fonction de son nom
     *  comme le fait la fonction require() et de l'instancier
     * @param module module a chargé
     * @param param différent parametre a passer au constructeur sous forme de tableau
     * @throws new KarryngoLoaderException() si le module est introuvable
     * @returns l'instance du module
     * @see require()
     * @see import()
     */
    DynamicLoader.load = function (module, param) {
        var _a;
        if (param === void 0) { param = []; }
        var keyClass = '';
        var moduleRequire = {};
        try {
            moduleRequire = require(process.cwd() + "/" + module);
            for (var key in moduleRequire)
                keyClass = key;
        }
        catch (e) {
            throw new KarryngoLoaderException_1.KarryngoLoaderException(KarryngoLoaderException_1.KarryngoLoaderException.CLASS_NOT_FOUND, "Erreur d'instanciation du module: " + e);
        }
        return new ((_a = moduleRequire[keyClass.toString()]).bind.apply(_a, __spreadArrays([void 0], param)))();
    };
    /**
     * @description Cette fonction permet d'appeler une methode a partir de son nom
     *  dynamiquement en lui passant les paramétres
     * @param obj object sur lequel la methode est appelé
     * @param method la méthode a appeler
     * @param params liste des paramétres a passer a la methode appeler
     * @returns l'object retourner par l'appel de la fonction
     * @throws new KarryngoLoaderException() si la methode n'a pas été trouvé dans la classe
     */
    DynamicLoader.call = function (obj, method, params) {
        var result = null;
        try {
            result = obj[method.toString()].apply(obj, params);
        }
        catch (error) {
            throw new KarryngoLoaderException_1.KarryngoLoaderException(KarryngoLoaderException_1.KarryngoLoaderException.METHOD_NOT_FOUND, "Erreur d'appel de la methode '" + method + "' du module: " + error);
        }
        return result;
    };
    return DynamicLoader;
}());
exports.DynamicLoader = DynamicLoader;
