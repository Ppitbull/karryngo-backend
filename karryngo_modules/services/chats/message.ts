/**
@author Cedric Nguendap
@description Cette classe represente l'entité des messages
@created 19/01/2021
*/

import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class Message extends KarryngoPersistentEntity
{
    from:String="";
    to:String="";
    date:Partial<{date:string,hours:string}>={};
    title:String="";
    content:String="";

    toString():any
    {
        return {
            ...super.toString(),
            from:this.from,
            to:this.to,
            date:this.date,
            title:this.title,
            content:this.content
        };
    }

    hydrate(entity: any): void
    {
        super.hydrate(entity);
        this.from=this.purgeAttribute(entity,"from");
        this.to=this.purgeAttribute(entity,"to");
        this.date=this.purgeAttribute(entity,"date");
        this.title=this.purgeAttribute(entity,"title");
        this.content=this.purgeAttribute(entity,"content");
    }


}