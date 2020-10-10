/**
@author: Cedric nguendap
@description: interface permetant d'implémenter les procédures d'acces 
    au fichier de confoguration
@created: 21/09/2020
*/

export interface ConfigurableApp
{
    /**
     * @description permet de savoir si une cles existe dans un fichier de configuration
     * @param key cles de l'élément configurer
     * @returns Boolean: vrai si l'élement existe et faux dans le cas contraire
     */
    keyExist(key:String):Boolean;

    /**
     * @description returne la valeur d'une cles dans un fichier de configuration
     * @param key clés de l'élément configurer
     * @returns any: valeur de la cles contenue dans le fichier de configuration
     */
    getValueOf(key:String):any;

    /**
     * @description affecte une nouvele valeur a un élément configurer
     * @param key cles de l'élément configurer
     * @param value nouvelle valeur de la cles
     */
    setValueOf(key:String,value:any):void;

    /**
     * @description permet de parser le fichier de configuration et de 
     *  d'inserer le contenu dans l'objet contenant les éléments de configuration
     * @param urlFile url du fichier de configuration
     * @returns any objet de type JSON, XML ou tout autre selon le format
     */
    parse(urlFile:String):any;

    /**
     * @description permet d'obtenir la liste des cles des fichiers de configuration
     * @returns liste des cles des fichiers de configurations sous forme de chaine de carractéres
     */
    getKeysList():String[];

    /**
     * @description permet d'obtenir l'object de configuration
     * @returns l'objet de configuration
     */
    getConfigObject():any;
}