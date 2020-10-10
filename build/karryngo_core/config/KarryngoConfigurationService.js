"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var fs = __importStar(require("fs"));
var FileSystemException_1 = require("../exception/FileSystemException");
var constants_1 = __importDefault(require("../../config-files/constants"));
var ConfigurationException_1 = require("../exception/ConfigurationException");
var KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
var KarryngoConfigurationService = /** @class */ (function (_super) {
    __extends(KarryngoConfigurationService, _super);
    function KarryngoConfigurationService() {
        var _this = _super.call(this) || this;
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
        _this.configObject = [];
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
        _this.mirrorConfigObject = [];
        _this.configFileEncoding = 'utf8';
        _this.constructConfiguration(constants_1.default.app_config_file);
        return _this;
    }
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.toString = function () { };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.hydrate = function (entity) { };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.keyExist = function (key) {
        var result = this.mirrorConfigObject.findIndex(function (obj) { return key == obj.key; });
        if (result < 0)
            return false;
        return true;
    };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.getValueOf = function (key) {
        var result = this.mirrorConfigObject.find(function (obj) { return key == obj.key; });
        if (result == undefined)
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, "key " + key + " not found");
        return result.value;
    };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.setValueOf = function (key, value) {
        var result = this.mirrorConfigObject.find(function (obj) { return key == obj.key; });
        if (result == undefined)
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, "key " + key + " not found");
        result.value = value;
        this.updateItem(result);
    };
    /**
     * @inheritdoc
     */
    KarryngoConfigurationService.prototype.parse = function (urlFile) {
        var content = this.encode(this.readFile(urlFile));
        return content;
    };
    /**
      * @inheritdoc
      */
    KarryngoConfigurationService.prototype.getKeysList = function () {
        return this.mirrorConfigObject.map(function (obj) { return obj.key; });
    };
    /**
      * @inheritdoc
      */
    KarryngoConfigurationService.prototype.getConfigObject = function () {
        return this.configObject;
    };
    /**
     * @description cette fonction engistre le contenu de la configuration
     *  dans un fichier de configuration
     * @param content contenu a inserer dans le fichier
     * @param urlFile url du fichier
     */
    KarryngoConfigurationService.prototype.saveFile = function (content, urlFile) {
        if (fs.existsSync(urlFile.toString())) {
            fs.writeFileSync(urlFile.toString(), content.toString(), 'utf8');
        }
        else
            throw new FileSystemException_1.FileSystemException(FileSystemException_1.FileSystemException.UNKNOW_ERROR, "file " + urlFile.toString() + " not found");
    };
    /**
     * @description cette fonction permet de lire le contenu d'un
     *  fichier de configuration et de le retourner sous forme de
     *  chaine de carractére
     * @param urlFile url du fichier a lire
     * @returns contenu du fichier de configuration lue
     */
    KarryngoConfigurationService.prototype.readFile = function (urlFile) {
        try {
            return fs.readFileSync(urlFile.toString(), 'utf8');
        }
        catch (error) {
            throw new FileSystemException_1.FileSystemException(FileSystemException_1.FileSystemException.UNKNOW_ERROR, error);
        }
    };
    /**
     * @description permet d'enregistrer toutes les configurations dans leurs
     *  fichier respectif
     * @see KarryngoConfigurationService.saveFile()
     */
    KarryngoConfigurationService.prototype.save = function () {
        var _this = this;
        this.configObject.forEach(function (obj) {
            _this.saveFile(_this.decode(obj.config), obj.url);
        });
    };
    /**
     * @description permet d'initier la construction du l'objet de configuration
     * @param urlFile url du fichier de configuration de base
     */
    KarryngoConfigurationService.prototype.constructConfiguration = function (urlFile) {
        var _this = this;
        this.configObject.push({
            url: urlFile,
            config: this.parse(urlFile)
        });
        this.configObject.forEach(function (obj) {
            _this.recursiveConstructConfiguration(_this.parse(urlFile), urlFile);
        });
    };
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
    KarryngoConfigurationService.prototype.recursiveConstructConfiguration = function (obj, urlFile) {
        if (obj instanceof Array) //si l'objet est un tableau
         {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
                var elmt = obj_1[_i];
                this.recursiveConstructConfiguration(elmt, urlFile);
            }
        }
        else if (obj.constructor == ({}).constructor) //si l'objet est un objet(JSON)
         {
            var file = urlFile;
            //pour chaque pair de cles valeur de l'objet
            for (var elmt in obj) {
                //si on ne doit pas parser alors on cree l'objet et on l'ajouet a l'objet de configuration
                //et au mirroir
                if ((obj[elmt].constructor == ({}).constructor) && ((obj[elmt].hasOwnProperty('parse') && !obj[elmt].parse))) {
                    if (obj[elmt].hasOwnProperty("url"))
                        file = obj[elmt]['url'];
                    var notParseObj = {};
                    notParseObj[elmt] = obj[elmt];
                    this.configObject.push({
                        url: file,
                        config: notParseObj
                    });
                    this.mirrorConfigObject.push({
                        url: file,
                        key: elmt,
                        value: this.parse(file)
                    });
                }
                else {
                    if (elmt == "url") {
                        file = obj[elmt]; //si la l'url est définis on recupere cette url
                        //et on examine son contenu
                        var objParse = this.parse(urlFile);
                        this.configObject.push({
                            url: file,
                            config: objParse
                        }); //on sauvegarde le nouvel objet
                        this.recursiveConstructConfiguration(objParse, file);
                    }
                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles sinon on conserve la cles, la valeur et l'url du fichier dans la mirroir 
                    else if (obj[elmt] instanceof Object)
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
    };
    /**
     * @description permet de mettre a jour une cles de configuratoin
     * @param object objet contenant les informations sur la mise a jour (cles, valeur, fichier)
     * @throws new ConfigurationException() si une information (cles, valeur, url du fichier) est manquant
     *  si l'argument n'est pas un objet (JSON)
     */
    KarryngoConfigurationService.prototype.updateItem = function (object) {
        if (object instanceof Object) {
            if (!object.hasOwnProperty('url') || !object.hasOwnProperty('key') || !object.hasOwnProperty('value')) {
                var notFoundKey = object.hasOwnProperty('url') ?
                    (object.hasOwnProperty('key') ?
                        (object.hasOwnProperty('value') ?
                            '' :
                            'value') : 'key') : 'url';
                throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND, "key " + notFoundKey + " not found in argument " + object + " ");
            }
            var config = this.configObject.find(function (obj) { return obj.url == object.url; });
            if (config != undefined) {
                this.recursiveUpdateItem(config, object.key, object.value);
            }
        }
        else
            throw new ConfigurationException_1.ConfigurationException(ConfigurationException_1.ConfigurationException.ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT, "argument " + object + " is no a valid object for configuration");
    };
    /**
     * @description cette fonction permet de parcourir l'arbre afin de trouvé la cles
     *  a mettre a jour. inspéré de la methode recursiveConstructConfiguration()
     * @param obj objet (arbre) contenant la pair cles-valeurs a mettre a jour
     * @param key cles a mettre a jour
     * @param value nouvelle valeur a sauvegarder
     * @see recursiveConstructConfiguration()
     */
    KarryngoConfigurationService.prototype.recursiveUpdateItem = function (obj, key, value) {
        if (obj instanceof Array) //si l'objet est un tableau
         {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for (var _i = 0, obj_2 = obj; _i < obj_2.length; _i++) {
                var elmt = obj_2[_i];
                this.recursiveUpdateItem(elmt, key, value);
            }
        }
        else if (obj instanceof Object) //si l'objet est un objet(JSON)
         {
            if (obj.hasOwnProperty(key))
                obj[key.toString()] = value.toString(); //si la cles existe on le met a jour
            else {
                for (var elmt in obj) {
                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles
                    if (obj[elmt] instanceof Object)
                        this.recursiveUpdateItem(obj[elmt], key, value);
                }
            }
        }
    };
    return KarryngoConfigurationService;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.KarryngoConfigurationService = KarryngoConfigurationService;
