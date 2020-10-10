import { idText } from "typescript";
import { KarryngoEntity } from "../KarryngoEntity";
import { EntityID } from "../utils/EntityID";

export abstract class KarryngoPersistentEntity extends KarryngoEntity
{
    /**
     * @description identifiant d'une entité
     * @type EntityID
     */
    public id:EntityID;
    constructor(id:EntityID)
    {
        super();
        this.id=id;
    }
    /**
     * @description Cette methode permet de verifier l'existance d'un valeur dans un fichier de configuration   
     *  un objet JSON afin de retourner sa valeur. cela évite des erreurs du a la tentative
     *  d'accés a un attribue non contenu dans l'objet JSON
     * @param object objet au format JSON
     * @param attr attribue dont on veu la valeur
     * @return null si l'attribut n'exite pas et sa valeur dans le cas contraire
     */
    purgeAttribute(object:any,attr:any):any
    {
        return object.hasOwnProperty(attr)?object[attr]:null;
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:KarryngoEntity):void
    {
        this.id=this.purgeAttribute(entity,"id");
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            id:this.id
        };
    }

}