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
    content:String="";
    read:number=0;

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
        super.hydrate(entity);
        this.from.setId(this.purgeAttribute(entity,"from"));
        this.to.setId(this.purgeAttribute(entity,"to"));
        this.date=this.purgeAttribute(entity,"date");
        this.title=this.purgeAttribute(entity,"title");
        this.content=this.purgeAttribute(entity,"content");
        this.read=this.purgeAttribute(entity,"read");
    }


}