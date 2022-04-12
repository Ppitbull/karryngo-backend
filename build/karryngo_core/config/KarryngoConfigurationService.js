"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoConfigurationService = void 0;
const fs = __importStar(require("fs"));
const FileSystemException_1 = require("../exception/FileSystemException");
const constants_1 = __importDefault(require("../../config-files/constants"));
const ConfigurationException_1 = require("../exception/ConfigurationException");
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
class KarryngoConfigurationService extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor() {
        super();
        /**
         * @description Ce parametre de type tableau d'object de type JSON permet de stocké l'ensemble des élements
         * de configuration. et est sous la forme:
         *  {
         *      'url':'url',
         *      'config':{
         *              'cles':valeur
         *              }
         *  }
         */
        this.configObject = [];
        /**
         * @type Object[]
         * @description ce paramétre est un tableau d'object qui sert de mirroir pour
         *  l'objet de configuration et facilite la manipulation de l'object (arbre) de configuration
         * il est sous la forme
         * [
         *  {
         *      url:'url',
         *      key:'key',
         *      value:''
         *  }
         * ]
         */
        this.mirrorConfigObject = [];
        this.configFileEncoding = 'utf8';
        this.constructConfiguration(constants_1.default.app_config_file);
    }
    /**
     * @inheritdoc
     */
    toString() { }
    /**
     * @inheritdoc
     */
    hydrate(entity) { }
    /**
     * @inheritdoc
     */
    keyExist(key) {
        let result = this.mirrorConfigObject.findIndex((obj) => key == obj.key);
        if (result < 0)
            return false;
        return true;
    }
    /**
     * @inheritdoc
     */
    getValueOf(key) {
        let result = this.mirrorConfigObject.find((obj) => key == obj.key);
        if (result == undefined)
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, `key ${key} not found`);
        return result.value;
    }
    /**
     * @inheritdoc
     */
    setValueOf(key, value) {
        let result = this.mirrorConfigObject.find((obj) => key == obj.key);
        if (result == undefined)
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, `key ${key} not found`);
        result.value = value;
        this.updateItem(result);
    }
    /**
     * @inheritdoc
     */
    parse(urlFile) {
        let content = this.encode(this.readFile(urlFile));
        return content;
    }
    /**
      * @inheritdoc
      */
    getKeysList() {
        return this.mirrorConfigObject.map(obj => obj.key);
    }
    /**
      * @inheritdoc
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
        if (fs.existsSync(urlFile.toString())) {
            fs.writeFileSync(urlFile.toString(), content.toString(), 'utf8');
        }
        else
            throw new FileSystemException_1.FileSystemException(FileSystemException_1.FileSystemException.UNKNOW_ERROR, `file ${urlFile.toString()} not found`);
    }
    /**
     * @description cette fonction permet de lire le contenu d'un
     *  fichier de configuration et de le retourner sous forme de
     *  chaine de carractére
     * @param urlFile url du fichier a lire
     * @returns contenu du fichier de configuration lue
     */
    readFile(urlFile) {
        try {
            return fs.readFileSync(urlFile.toString(), 'utf8');
        }
        catch (error) {
            throw new FileSystemException_1.FileSystemException(FileSystemException_1.FileSystemException.UNKNOW_ERROR, error);
        }
    }
    /**
     * @description permet d'enregistrer toutes les configurations dans leurs
     *  fichier respectif
     * @see KarryngoConfigurationService.saveFile()
     */
    save() {
        this.configObject.forEach((obj) => {
            this.saveFile(this.decode(obj.config), obj.url);
        });
    }
    /**
     * @description permet d'initier la construction du l'objet de configuration
     * @param urlFile url du fichier de configuration de base
     */
    constructConfiguration(urlFile) {
        this.configObject.push({
            url: urlFile,
            config: this.parse(urlFile)
        });
        this.configObject.forEach((obj) => {
            this.recursiveConstructConfiguration(this.parse(urlFile), urlFile);
        });
    }
    /**
     * @description Cette fonction permet de construire le mirroir a partir de l'objet JSON
     *  lue dans le fichier de configuration spécifier. cette fonction parcourt l'objet et
     *  s'appelle recursivement lorsque la valeur de la cles est un tableau ou un objet JOSN
     *  si la valeur de la cles et une url alors le fichier est lue et le mirroir associé a
     *  cette object est lue.
     *  si la valeur est un type primitif alors on sauvegarde les informations par rapport
     *  a la cles, la valeur et le fichier de configuration de l'objet en cours de traitement
     *  si l'object ne doit pas être parser (parse=false) lors on recupere l'objet et on
     *  l'ajoute au mirroir
     * @param obj objet a construire dans le mirroir
     * @param urlFile url du fichier de configuration
     * @see parse()
     */
    recursiveConstructConfiguration(obj, urlFile) {
        if (obj instanceof Array) //si l'objet est un tableau
         {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for (let elmt of obj)
                this.recursiveConstructConfiguration(elmt, urlFile);
        }
        else if (obj.constructor == ({}).constructor) //si l'objet est un objet(JSON)
         {
            let file = urlFile;
            //pour chaque pair de cles valeur de l'objet
            for (let elmt in obj) {
                //si on ne doit pas parser alors on cree l'objet et on l'ajouet a l'objet de configuration
                //et au mirroir
                if ((obj[elmt].constructor == ({}).constructor) && ((obj[elmt].hasOwnProperty('parse') && !obj[elmt].parse))) {
                    let notParseObj = {};
                    notParseObj[elmt] = obj[elmt];
                    let notParseObjCopy = Object.assign({}, notParseObj);
                    if (obj[elmt].hasOwnProperty("url")) {
                        file = obj[elmt]['url'];
                        delete notParseObjCopy[elmt]['url'];
                        delete notParseObjCopy[elmt]['parse'];
                        let tab = this.parse(file);
                        if (tab instanceof Array)
                            notParseObjCopy[elmt] = [...tab];
                        else
                            notParseObjCopy[elmt] = Object.assign(Object.assign({}, notParseObjCopy[elmt]), tab);
                    }
                    this.configObject.push({
                        url: file,
                        config: notParseObj[elmt]
                    });
                    this.mirrorConfigObject.push({
                        url: file,
                        key: elmt,
                        value: notParseObjCopy[elmt]
                    });
                    //console.log("objet ",this.mirrorConfigObject[this.mirrorConfigObject.length-1]);
                }
                else {
                    if (elmt == "url") {
                        file = obj[elmt]; //si la l'url est définis on recupere cette url
                        //et on examine son contenu
                        let objParse = this.parse(urlFile);
                        this.configObject.push({
                            url: file,
                            config: objParse
                        }); //on sauvegarde le nouvel objet
                        this.recursiveConstructConfiguration(objParse, file);
                    }
                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles sinon on conserve la cles, la valeur et l'url du fichier dans la mirroir 
                    else if (obj[elmt].constructor == ({}).constructor)
                        this.recursiveConstructConfiguration(obj[elmt], file);
                    else {
                        this.mirrorConfigObject.push({
                            url: file,
                            key: elmt,
                            value: obj[elmt]
                        });
                    }
                }
            }
        }
    }
    /**
     * @description permet de mettre a jour une cles de configuratoin
     * @param object objet contenant les informations sur la mise a jour (cles, valeur, fichier)
     * @throws new ConfigurationException() si une information (cles, valeur, url du fichier) est manquant
     *  si l'argument n'est pas un objet (JSON)
     */
    updateItem(object) {
        if (object instanceof Object) {
            if (!object.hasOwnProperty('url') || !object.hasOwnProperty('key') || !object.hasOwnProperty('value')) {
                let notFoundKey = object.hasOwnProperty('url') ?
                    (object.hasOwnProperty('key') ?
                        (object.hasOwnProperty('value') ?
                            '' :
                            'value') : 'key') : 'url';
                throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, `key ${notFoundKey} not found in argument ${object} `);
            }
            let config = this.configObject.find((obj) => obj.url == object.url);
            if (config != undefined) {
                this.recursiveUpdateItem(config, object.key, object.value);
            }
        }
        else
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT, `argument ${object} is no a valid object for configuration`);
    }
    /**
     * @description cette fonction permet de parcourir l'arbre afin de trouvé la cles
     *  a mettre a jour. inspéré de la methode recursiveConstructConfiguration()
     * @param obj objet (arbre) contenant la pair cles-valeurs a mettre a jour
     * @param key cles a mettre a jour
     * @param value nouvelle valeur a sauvegarder
     * @see recursiveConstructConfiguration()
     */
    recursiveUpdateItem(obj, key, value) {
        if (obj instanceof Array) //si l'objet est un tableau
         {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for (let elmt of obj)
                this.recursiveUpdateItem(elmt, key, value);
        }
        else if (obj instanceof Object) //si l'objet est un objet(JSON)
         {
            if (obj.hasOwnProperty(key))
                obj[key.toString()] = value.toString(); //si la cles existe on le met a jour
            else {
                for (let elmt in obj) {
                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles
                    if (obj[elmt] instanceof Object)
                        this.recursiveUpdateItem(obj[elmt], key, value);
                }
            }
        }
    }
}
exports.KarryngoConfigurationService = KarryngoConfigurationService;
