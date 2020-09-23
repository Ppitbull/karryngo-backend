"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoConfigurationService = void 0;
/*
@author: Cedric nguendap
@description: classe abstraite offrant l'ensemble des services d'acces a la configuration
    systéme car implémente l'interface Configurable App
@see ConfigurableApp
@created: 21/09/2020
*/
const KarryngoEntity_interface_1 = require("./../KarryngoEntity.interface");
class KarryngoConfigurationService extends KarryngoEntity_interface_1.KarryngoEntity {
    constructor() {
        super(...arguments);
        /**
         * Ce parametre de type tableau d'object de type JSON permet de stocké l'ensemble des élements
         * de configuration. et est sous la forme:
         * [
         *  {
         *      'urlfile':'url',
         *      'config':{
         *              'cles':valeur
         *              }
         *  }
         * ]
         */
        this.configObject = [];
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
     *
     * @see key ConfigurableApp.keyExist()
     */
    keyExist(key) {
        for (let obj of this.configObject) {
            if (obj.config.hasOwnProperty(key))
                return true;
        }
        return false;
    }
    /**
     * @see ConfigurableApp.getValueOf()
     */
    getValueOf(key) {
        for (let obj of this.configObject) {
            if (obj.config.hasOwnProperty(key))
                return obj.config[key.toString()];
        }
        return null;
    }
    /**
     * @@see ConfigurableApp.setValueOf()
     */
    setValueOf(key, value) {
        for (let obj of this.configObject) {
            if (obj.config.hasOwnProperty(key))
                return obj.config[key.toString()];
        }
    }
    /**
     * @see ConfigurableApp.parse()
     */
    parse(urlFile) {
        let content = this.readFile(urlFile);
        content = this.encode(content);
        this.configObject.push(content);
    }
    /**
     *@see ConfigurableApp.getKeysList()
     */
    getKeysList() {
        return [];
    }
    /**
     *@see ConfigurableApp.getConfigObject()
     */
    getConfigObject() {
        return this.configObject;
    }
    /**
     * @description cette fonction engistre le contenu de la configuration
     *  dans un fichier de configuration
     * @param content contenu a inserer dans le fichier
     * @param urlFile url du fichier
     */
    saveFile(content, urlFile) {
    }
    /**
     * @description cette fonction permet de lire le contenu d'un
     *  fichier de configuration et de le retourner sous forme de
     *  chaine de carractére
     * @param urlFile url du fichier a lire
     * @returns contenu du fichier de configuration lue
     */
    readFile(urlFile) {
        //return fs.readFile();
        return "null";
    }
}
exports.KarryngoConfigurationService = KarryngoConfigurationService;
