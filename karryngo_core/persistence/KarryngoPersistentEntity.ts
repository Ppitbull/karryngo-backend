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
}