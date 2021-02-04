/**
@author Cedric Nguendap
@description Cette classe permet d'envoyer des notifications
@created 19/01/2021
*/

import { DBPersistence, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Discussion } from "./discussion";
import { Message } from "./message";

@Service()
@DBPersistence()
export class ChatService
{
    private db:any={};

    send(message:Message,idDiscuss:String=new EntityID().toString()):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection("Chats",{"_id":idDiscuss},1)
            .then((data:ActionResult)=>{
                if(data.result.length==0)
                {
                    let discuss:Discussion=new Discussion(new EntityID());
                    discuss.id.setId(idDiscuss);
                    discuss.chats.push(message);
                    return this.db.addToCollection("Chats",discuss);
                }
                else
                {
                    let discussList:Message[]=data.result[0].chats.map((chat:Record<string, any>)=>{
                        let mess=new Message(new EntityID());
                        mess.hydrate(chat);
                        return mess;
                    });
                    discussList.push(message);
                    return this.db.updateInCollection("Chats",{"_id":idDiscuss},{"chats":discussList},{})
                }

            })
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>reject(error));
        })
    
    }
    readAll(idUser:String):Promise<ActionResult>
    {
        return this.db.findInCollection("Chats", { "_id": idUser },100);
    }
}
