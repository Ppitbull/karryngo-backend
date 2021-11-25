import { idText } from "typescript";
import { KarryngoEntity } from "../KarryngoEntity";
import { EntityID } from "../utils/EntityID";

export abstract class KarryngoPersistentEntity extends KarryngoEntity
{
    /**
     * @description identifiant d'une entité
     * @type EntityID
     */
    public _id:EntityID;

    
    constructor(id:EntityID=new EntityID())
    {
        super();
        this._id=id;
    }
    
    /**
     * @description Cette methode permet de verifier l'existance d'un valeur dans   
     *  un objet JSON afin de retourner sa valeur. cela évite des erreurs du a la tentative
     *  d'accés a un attribue non contenu dans l'objet JSON
     * @param object objet au format JSON
     * @param attr attribue dont on veu la valeur
     * @return null si l'attribut n'exite pas et sa valeur dans le cas contraire
     */
    purgeAttribute(object:Record<string|number,any>,attr:String):any
    {        
        if(object==null || object==undefined) return null;
        if(object.hasOwnProperty(attr.toString())) return object[attr.toString()]
        if(this.hasOwnProperty(attr.toString()))  return Reflect.get(this,attr.toString());
        return null;
    }

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        //console.log("Entity ",entity._id)
        if(entity && entity._id) this.id=this.purgeAttribute(entity,"_id");
        
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            _id:this.id.toString()
        };
    }
    set id(_id:EntityID)
    {
        this._id=_id;
    }
    get id():EntityID
    {
        return this._id;
    }

}