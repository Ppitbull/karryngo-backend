"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicLoader = void 0;
/**
@author: Cedric nguendap
@description: Cette classe permet des faires des instanciations dynamique de classe et des appels dynamique
    de fonction
@created: 23/09/2020
*/
const KarryngoLoaderException_1 = require("../exception/KarryngoLoaderException");
class DynamicLoader {
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
    static load(module, param = []) {
        let keyClass = '';
        let moduleRequire = {};
        try {
            moduleRequire = require(`${process.cwd()}/${module}`);
            for (let key in moduleRequire)
                keyClass = key;
        }
        catch (e) {
            throw new KarryngoLoaderException_1.KarryngoLoaderException(KarryngoLoaderException_1.KarryngoLoaderException.CLASS_NOT_FOUND, "Erreur d'instanciation du module: " + e);
        }
        return new moduleRequire[keyClass.toString()](...param);
    }
    /**
     * @description permet de charger dynamiquement une classe en fonction de son nom
     *  comme le fait la fonction require() et mais sans l'instancier
     * @param module module a chargé
     * @throws new KarryngoLoaderException() si le module est introuvable
     * @returns le module
     * @see require()
     * @see import()
     */
    static loadWithoutInstance(module) {
        let keyClass = '';
        let moduleRequire = {};
        try {
            // console.log(module)
            moduleRequire = require(`${process.cwd()}/${module}`);
            for (let key in moduleRequire)
                keyClass = key;
        }
        catch (e) {
            throw new KarryngoLoaderException_1.KarryngoLoaderException(KarryngoLoaderException_1.KarryngoLoaderException.CLASS_NOT_FOUND, `Module: non trouvé ${e}`);
        }
        return moduleRequire[keyClass.toString()];
    }
    /**
     * @description Cette fonction permet d'appeler une methode a partir de son nom
     *  dynamiquement en lui passant les paramétres
     * @param obj object sur lequel la methode est appelé
     * @param method la méthode a appeler
     * @param params liste des paramétres a passer a la methode appeler
     * @returns l'object retourner par l'appel de la fonction
     * @throws new KarryngoLoaderException() si la methode n'a pas été trouvé dans la classe
     */
    static call(obj, method, params) {
        //console.log("method ",method," params ",params);
        let result = null;
        try {
            result = obj[method.toString()](...params);
        }
        catch (error) {
            throw new KarryngoLoaderException_1.KarryngoLoaderException(KarryngoLoaderException_1.KarryngoLoaderException.METHOD_NOT_FOUND, `Erreur d'appel de la methode '${method}' du module avec pour erreur ${error}`);
        }
        return result;
    }
}
exports.DynamicLoader = DynamicLoader;
