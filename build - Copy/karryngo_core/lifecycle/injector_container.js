"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectorContainer = void 0;
/**
@author: Cedric nguendap
@description: Cette classe est un container d'instance et fait également office d'injecteur
    de dépendance par le biais des décorateur @Controller() et @Service()
    Elle implémente le design patern singleton
@created: 10/10/2020
*/
require("reflect-metadata");
const KarryngoConfigurationServiceFactory_1 = require("../config/KarryngoConfigurationServiceFactory");
class InjectorContainer extends Map {
    constructor() {
        super();
    }
    /**
     * @description permet d'obtenir l'instance de la classe InjectorContainer
     *  respectivement au concept énoncé du design partern Singleton
     * @return une instance de la classe InjectorContainer
     */
    static getInstance() {
        if (!this.instance)
            this.instance = new InjectorContainer();
        return this.instance;
    }
    /**
     * @description Cette méthode permet de résoudre les dépendance lié a une classes
     *  si lors de la résolution des dépendances une dépendance posséde aussi des dépendances
     *  alors ces dépendances sont également résolut
     *
     * @param target la classe dont on désire l'instance
     * @return instance de classe recus en argument
     */
    resolve(target) {
        //obtention des métadonnées de la classe. ces méthodes concerne particulierement
        //les parametres du constructor de la classe
        // console.log("Classe ",target)
        // if (!target) return null;
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        // console.log("class ",target,tokens);
        //pour chaque parametres du constructor appelle recuresivement la méthode resolveAndSave()
        //afin d'obtenir une instance du parametre. Le tout est retourné sous forme de tableau
        const injections = [];
        tokens.forEach((token) => {
            // console.log("Token ",token)
            if (token)
                injections.push(this.resolveAndSave(token));
        });
        //on essaie de voir si une instance de la classe courante existe déjà 
        //voir design partern Singleton
        const classInstance = this.get(target);
        //si existant alors on retourne automatiquement cette instance
        if (classInstance)
            return classInstance;
        const newClassInstance = new target(...injections);
        //console.log(`DI-Container created class ${newClassInstance.constructor.name}`);
        //si non on retourne l'instance associer
        return newClassInstance;
    }
    /**
     * @description cette classe permet de creer une instance de la classe recus
     *  en parametre et la sauvegarder en mémoire pour des futures appels
     * @see InjectorContainer.resolve()
     * @param target la classe dont on désire resoudre toute les dépendance
     */
    resolveAndSave(target) {
        let instance = this.resolve(target);
        if (instance)
            this.set(target, instance);
        return instance;
    }
    /**
     * @description permet de nétoyer la mémoire de toutes les instances de classes
     *  contenues en mémoire
     */
    release() {
        for (const value of this.values()) {
            if (typeof value['release'] === 'function') {
                value['release']();
            }
        }
        this.clear();
    }
    getInstanceOf(classe) {
        let instance = this.get(classe);
        if (instance)
            return instance;
        // instance=this.resolve<any>(classe);
        // this.set(classe,instance);
        // return instance;
        return this.resolveAndSave(classe);
    }
    saveInstance(classe, instance) {
        this.set(classe, instance);
    }
    bootstrap(moduleList = []) {
        this.resolveAndSave(KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory);
        //this.resolveAndSave<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory);
        moduleList.forEach((module) => {
            // console.log("module ",module)
            this.resolve(module);
        });
    }
}
exports.InjectorContainer = InjectorContainer;
/**
 * @description Cette propriété est une instance de la classe InjectorContainer
 *  et est nécessaire a l'implémentation du design patern Singleton
 * @type InjectorContainer
 */
InjectorContainer.instance = InjectorContainer.getInstance();
