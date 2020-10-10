/** 
@author: Cedric nguendap
@description: Ceci est une interface qui permet de sérialisé les 
    objet
@created: 21/09/2020
 @see Serializable Entity
*/
import {KarryngoEntity} from './KarryngoEntity';

export interface SerializableEntity
{
    /***
     * @description permet de générer le modele JSON de l'objet
     * @returns any au format JSON
     */
    toString():any;

     /**
     * @description permet de peupler les attributs de l'objet
     * @param entity 
     */
    hydrate(entity:KarryngoEntity):void;
}