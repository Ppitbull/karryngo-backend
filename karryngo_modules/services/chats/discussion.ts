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
    read:number=0; /** O: pour non lue et 1 pour lu */

    toString()
    {
        return {
            ...super.toString(),
            inter1:this.inter1.toString(),
            inter2:this.inter2.toString(),
            idTransaction:this.idTransaction.toString(),
            chats:this.chats.map((chat)=>chat.toString()),
            idProject:this.idProject.toString(),
            read:this.read
        }; 
    }
    hydrate(entity: any): void
    {
        // console.log("id ",this.id)
        for (const key of Object.keys(entity)) {
            if (key == "_id") this.id.setId(entity[key]);
            else if (key == "inter1") this.inter1.setId(entity[key]);
            else if (key == "inter2") this.inter2.setId(entity[key]);
            else if (key == "idProject") this.idProject.setId(entity[key]);
            else if (key == "chats") this.chats =entity[key].map((chat: Record<string, any>) => {
                let disc: Message = new Message(new EntityID());
                disc.hydrate(chat);
                return disc;
            })
            else if (key == "idTransaction") this.idTransaction.setId(entity[key]);

            else if (Reflect.has(this, key)) Reflect.set(this, key, entity[key]);
        }
        
    }


}
