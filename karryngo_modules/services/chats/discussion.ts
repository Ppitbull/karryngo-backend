import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Message } from "./message";

export class Discussion extends KarryngoPersistentEntity
{
    inter1:String="";
    inter2:String="";
    chats:Message[]=[];

    toString()
    {
        return {
            ...super.toString(),
            inter1:this.inter1,
            inter2:this.inter2,
            chats:this.chats.map((chat)=>chat.toString())
        }; 
    }
    hydrate(entity: any): void
    {
        super.hydrate(entity);
        this.inter1=this.purgeAttribute(entity,"inter1");
        this.inter2=this.purgeAttribute(entity,"inter2");
        this.chats=this.purgeAttribute(entity,"chats")
            ?this.purgeAttribute(entity,"chats").map((chat:Record<string,any>)=>{
                let disc:Message=new Message(new EntityID());
                disc.hydrate(chat);
                return disc;
            })
            :[];
        
    }


}
