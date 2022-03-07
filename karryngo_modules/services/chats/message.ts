/**
@author Cedric Nguendap
@description Cette classe represente l'entité des messages
@created 19/01/2021
*/

import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../karryngo_core/utils/EntityID";

export class Message extends KarryngoPersistentEntity
{
    from:EntityID=new EntityID();
    to:EntityID=new EntityID();
    date:String="";
    title:String="";
    content:any="";
    read:number=0;  /** O: pour non lue et 1 pour lu */

    toString():any
    {
        return {
            ...super.toString(),
            from:this.from.toString(),
            to:this.to.toObject(),
            date:this.date,
            title:this.title,
            content:this.content,
            read:this.read
        };
    }

    hydrate(entity: any): void
    {
        for (const key of Object.keys(entity)) {
            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "from") this.from.setId(entity[key]);
            else if (key == "to") this.to.setId(entity[key]);
            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }
    }


}