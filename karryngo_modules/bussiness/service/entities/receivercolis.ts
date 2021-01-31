import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class ReceiverColis extends KarryngoPersistentEntity
{
    public name:String="";
    public contact:String="";
    public parttypesupplied:String="";

    /**
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.name=this.purgeAttribute(entity,"name");
        this.contact=this.purgeAttribute(entity,"contact");
        this.parttypesupplied=this.purgeAttribute(entity,"parttypesupplied");
    }

    /**
     * @inheritdoc
     */
    toString():any
    {
        return {
            ...super.toString(),
            name:this.name,
            contact:this.contact,
            parttypesupplied:this.parttypesupplied
        };
    } 
}