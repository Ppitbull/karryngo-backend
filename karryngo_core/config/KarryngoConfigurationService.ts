/*
@author: Cedric nguendap
@description: classe abstraite offrant l'ensemble des services d'acces a la configuration 
    systéme car implémente l'interface Configurable App
@see ConfigurableApp
@created: 21/09/2020
@last_modified 23/09/2020
@modified by Cedric Nguendap
@todo doit tester cette classe
*/
import  { KarryngoEntity } from '../KarryngoEntity';
import { ConfigurableApp } from './ConfigurableApp.interface';
import * as fs from 'fs';
import { FileSystemException } from '../exception/FileSystemException';
import Configuration from '../../config-files/constants';
import { ConfigurationException } from '../exception/ConfigurationException';
import { KarryngoApplicationEntity } from '../KarryngoApplicationEntity';

export abstract class KarryngoConfigurationService extends KarryngoApplicationEntity implements ConfigurableApp
{
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
    protected configObject:any[]=[];

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
    protected mirrorConfigObject:any[]=[];


    protected configFileEncoding:String='utf8';

    constructor()
    {
        super();
        this.constructConfiguration(Configuration.app_config_file);
    }

    /***
     *@see SerializableEntity.toString()
     */
    toString():any{}

    /**
     * @see SerializableEntity.hydrate()
     */
    hydrate(entity:KarryngoEntity):void{}

    /**
     * 
     * @see key ConfigurableApp.keyExist()
     */
    keyExist(key:String):Boolean
    {
        let result = this.mirrorConfigObject.findIndex((obj)=> key==obj.key);
        if(result<0) return false; 
        return true;
    }

    /**
     * @see ConfigurableApp.getValueOf()
     */
    getValueOf(key:String):any
    {   
        let result = this.mirrorConfigObject.find((obj)=> key==obj.key);
        if(result==undefined) throw new ConfigurationException(ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND,`key ${key} not found`);
        return result.value;
    }

    /**
     * @see ConfigurableApp.setValueOf()
     */
    setValueOf(key:String,value:any):void
    {
        let result = this.mirrorConfigObject.find((obj)=> key==obj.key);
        if(result==undefined) throw new ConfigurationException(ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND,`key ${key} not found`);
        result.value=value;
        this.updateItem(result);
    }

    /**
     * @see ConfigurableApp.parse()
     */
    parse(urlFile:String):any
    {
        let content=this.encode(this.readFile(urlFile));        
        return content;            
    }

    /**
     *@see ConfigurableApp.getKeysList() 
     */
    getKeysList():String[]
    {
        return this.mirrorConfigObject.map(obj=> obj.key);
    }

    /**
     *@see ConfigurableApp.getConfigObject() 
     */
    getConfigObject():any
    {
        return this.configObject;
    }

    /**
     * @description cette fonction engistre le contenu de la configuration 
     *  dans un fichier de configuration
     * @param content contenu a inserer dans le fichier
     * @param urlFile url du fichier 
     */
    protected saveFile(content:String,urlFile:String)
    {
        if(fs.existsSync(urlFile.toString()))
        {
            fs.writeFileSync(urlFile.toString(),content.toString(),'utf8');
        }
        else throw new FileSystemException(FileSystemException.UNKNOW_ERROR,`file ${urlFile.toString()} not found`);
        
    }

    /**
     * @description cette fonction permet de lire le contenu d'un 
     *  fichier de configuration et de le retourner sous forme de 
     *  chaine de carractére
     * @param urlFile url du fichier a lire
     * @returns contenu du fichier de configuration lue
     */
    protected readFile(urlFile:String):String
    {
        try {
            return fs.readFileSync(urlFile.toString(),'utf8');
        } catch (error) {
            throw new FileSystemException(FileSystemException.UNKNOW_ERROR,error);
        }
                
    }
    
    /**
     * @description permet d'enregistrer toutes les configurations dans leurs 
     *  fichier respectif
     * @see KarryngoConfigurationService.saveFile()
     */
    save():void
    {
        this.configObject.forEach((obj)=>
        {
            this.saveFile(this.decode(obj.config),obj.url);
        });
    }

    /**
     * @description permet d'initier la construction du l'objet de configuration
     * @param urlFile url du fichier de configuration de base
     */
    protected constructConfiguration(urlFile:String):void
    {
        this.configObject.push({
            url:urlFile,
            config:this.parse(urlFile)
        });
        this.configObject.forEach((obj)=>
        {
            this.recursiveConstructConfiguration(this.parse(urlFile),urlFile);
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
    protected recursiveConstructConfiguration(obj:any,urlFile:String)
    {
        if(obj instanceof Array) //si l'objet est un tableau
        {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for( let elmt of obj) this.recursiveConstructConfiguration(elmt,urlFile);
        }
        else if(obj.constructor==({}).constructor)//si l'objet est un objet(JSON)
        {
            let file=urlFile;
            //pour chaque pair de cles valeur de l'objet
            for(let elmt in obj)
            {
                //si on ne doit pas parser alors on cree l'objet et on l'ajouet a l'objet de configuration
                //et au mirroir
                if((obj[elmt].constructor==({}).constructor) && ((obj[elmt].hasOwnProperty('parse') && !obj[elmt].parse)))
                {
                    if(obj[elmt].hasOwnProperty("url")) file=obj[elmt]['url'];
                    let notParseObj:any={};
                    notParseObj[elmt]=obj[elmt];                    
                    this.configObject.push({
                        url:file,
                        config:notParseObj
                    });
                    this.mirrorConfigObject.push({
                        url:file,
                        key:elmt,
                        value:this.parse(file)
                    });
                }
                else
                {
                    if(elmt=="url") 
                    {
                        file=obj[elmt];//si la l'url est définis on recupere cette url
                        //et on examine son contenu
                        let objParse=this.parse(urlFile);
                        this.configObject.push({
                            url:file,
                            config:objParse
                        }); //on sauvegarde le nouvel objet
                        this.recursiveConstructConfiguration(objParse,file);
                    }

                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles sinon on conserve la cles, la valeur et l'url du fichier dans la mirroir 
                    else if(obj[elmt] instanceof Object) this.recursiveConstructConfiguration(obj[elmt],file);
                    else 
                    {
                        this.mirrorConfigObject.push({
                            url:file,
                            key:elmt,
                            value:obj[elmt]
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
    protected updateItem(object:any):void
    {
        if(object instanceof Object)
        {
            if(!object.hasOwnProperty('url') || !object.hasOwnProperty('key') || !object.hasOwnProperty('value'))
            {
                let notFoundKey=object.hasOwnProperty('url')?
                    ( object.hasOwnProperty('key')?
                        ( object.hasOwnProperty('value')?
                            '':
                            'value'
                        ) :'key' 
                    ): 'url';
                throw new ConfigurationException(ConfigurationException.CONFIGURABLE_KEY_NOT_FOUND,`key ${notFoundKey} not found in argument ${object} `);
            }

            let config=this.configObject.find((obj)=> obj.url==object.url);
            if(config!=undefined)
            {
                this.recursiveUpdateItem(config,object.key,object.value);
            }
        }
        else throw new ConfigurationException(ConfigurationException.ARGUMENT_IS_NOT_CONFIGURABLE_OBJECT,`argument ${object} is no a valid object for configuration`);
    }

    /**
     * @description cette fonction permet de parcourir l'arbre afin de trouvé la cles 
     *  a mettre a jour. inspéré de la methode recursiveConstructConfiguration()
     * @param obj objet (arbre) contenant la pair cles-valeurs a mettre a jour
     * @param key cles a mettre a jour
     * @param value nouvelle valeur a sauvegarder
     * @see recursiveConstructConfiguration()
     */
    protected recursiveUpdateItem(obj:any,key:String,value:String):void
    {
        if(obj instanceof Array) //si l'objet est un tableau
        {
            //pour chaque element du tableau on appelle cette même méthode récursivement
            for( let elmt of obj) this.recursiveUpdateItem(elmt,key,value);
        }
        else if(obj instanceof Object)//si l'objet est un objet(JSON)
        {
            if(obj.hasOwnProperty(key)) obj[key.toString()]=value.toString();//si la cles existe on le met a jour
            else
            {
                for(let elmt in obj)
                {
                    //si la valeur de la cles est un objet (JSON) on reappelle cette methode pour chaque 
                    //valeur de la cles
                    if(obj[elmt] instanceof Object) this.recursiveUpdateItem(obj[elmt],key,value);            
                }
            }
            
        } 
    }

    /**
     * @description cette fonction permet de transformer une chaine de carractére sous 
     *  fome manipulable (JSON,XML,...)
     * @param content chaine de caractére a encodé (sous forme JSON, XML ou autre)
     * @throws new ConfigurationException() si une erreur existe dans l'object (JSON,XML,...)
     * @returns objet sous forme JSON, XML ou autre
     */
    protected abstract encode(content: String):any;

    /**
     * @description cette fonction permet de transfomer un objet en JSON, XML ou autre en 
     *  chaine de carractére qui peut être enregistrer dans un fichier texte au format soufaiter
     * @param content chaine de carractére a décoder
     * @throws new ConfigurationException() si une erreur existe dans la chaine de carractére
     *  qui doit être transfomé en object (JSON,XML,...)
     * @returns chaine de carractére obtenu
     */
    protected abstract decode(content:any):String;
}