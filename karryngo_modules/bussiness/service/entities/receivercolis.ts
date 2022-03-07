import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class ReceiverColis extends KarryngoPersistentEntity
{
    public name:String="";
    public contact:String="";
    public parttypesupplied:String="";

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