/**
@author Cedric Nguendap
@description Cette classe permet d'envoyer des notifications
@created 19/01/2021
*/

import Configuration from "../../../config-files/constants";
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
        return this.db.updateInCollection(
            Configuration.collections.chat,
            {"_id":idDiscuss.toString()},
            {
                $push:{"chats":message.toString()}
            },
            {}
        );
    }
    readAll(idUser:String):Promise<ActionResult>
    {
        return this.db.findInCollection(
            Configuration.collections.chat, { "_id": idUser },
            100
        );
    }
    startDiscussion(discution:Discussion):Promise<ActionResult>
    {
        return this.db.addToCollection(Configuration.collections.chat,discution);
    }

    getUnreadDiscution():Promise<ActionResult>
    {
        return this.db.findInCollection(Configuration.collections.chat,{"chats":{
                $elemMatch:{
                    "read":0
                }
            }},);
    }
    markAsRead(idDiscuss:String,idMessage:String):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.chat,
            {
                "_id":idDiscuss,
                "chats._id":idMessage
            },
            {
                $set:{ "chats.$.read":1}
            });
    }
}
