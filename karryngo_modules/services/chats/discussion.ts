import { KarryngoPersistentEntity } from "../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Message } from "./message";

export class Discussion extends KarryngoPersistentEntity
{
    inter1:EntityID=new EntityID();
    inter2:EntityID=new EntityID();
    idProject:EntityID=new EntityID();
    idTransaction:EntityID=new EntityID();
    chats:Message[]=[];

    toString()
    {
        return {
            ...super.toString(),
            inter1:this.inter1.toString(),
            inter2:this.inter2.toString(),
            idTransaction:this.idTransaction.toString(),
            chats:this.chats.map((chat)=>chat.toString()),
            idProject:this.idProject.toString()
        }; 
    }
    hydrate(entity: any): void
    {
        super.hydrate(entity);
        this.inter1.setId(this.purgeAttribute(entity,"inter1"));
        this.inter2.setId(this.purgeAttribute(entity,"inter2"));
        this.idProject.setId(this.purgeAttribute(entity,"idProject"));
        this.idTransaction.setId(this.purgeAttribute(entity,"idTransaction"))
        this.chats=this.purgeAttribute(entity,"chats")
            ?this.purgeAttribute(entity,"chats").map((chat:Record<string,any>)=>{
                let disc:Message=new Message(new EntityID());
                disc.hydrate(chat);
                return disc;
            })
            :[];
        
    }


}
