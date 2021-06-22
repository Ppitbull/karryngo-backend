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
import { TransactionService } from "../../bussiness/service/entities/transactionservice";
import { Discussion } from "./discussion";
import { Message } from "./message";

@Service()
@DBPersistence()
export class ChatService
{
    private db:any={};

    findDiscussByTransactionAndSendMessage(transaction:TransactionService,message:Message)
    {
        this.findDisccussByTransaction(transaction)
        .then((result:ActionResult)=>{
            return this.send(message,result.result.id);
        })
    }
    findDisccussByTransactionID(idTransaction:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve, reject)=>{
            this.db.findInCollection(
                Configuration.collections.chat,
                { "idTransaction":idTransaction.toString() },
                {"chats":false}
            ).then((result:ActionResult)=>
            {
                let disc:Discussion=new Discussion(result.result[0]._id);
                disc.hydrate(result.result[0]);
                result.result=disc;
                resolve(result);
            })
        })
    }
    findDisccussByTransaction(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve, reject)=>{
            this.db.findInCollection(
                Configuration.collections.chat,
                { "idTransaction":transaction.id.toString() },
                {"chats":false}
            ).then((result:ActionResult)=>
            {
                let id:EntityID=new EntityID();
                id.setId(result.result[0]._id);
                let disc:Discussion=new Discussion(id);
                // console.log("Discuss ",result.result[0])
                disc.hydrate(result.result[0]);
                result.result=disc;
                resolve(result);
            })
        })
    }
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
            Configuration.collections.chat, 
            { "_id": idUser },
            {},
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
    findMessageByDiscussionId(messageId:EntityID,discussID:EntityID):Promise<ActionResult>
    {
        return this.db.findInCollection(
            Configuration.collections.chat,
            {
                "_id":discussID.toString(),
                "chats._id":messageId.toString()
            },
        )
    }
    markAsRead(idDiscuss:String,idMessage:String):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.chat,
            {
                "_id":idDiscuss,
                "chats._id":idMessage
            },
            {
                $set:{ 
                    "chats.$.read":1,
                    "read":0
                }
            });
    }
    getDiscussionList(idUser:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(
                Configuration.collections.chat, 
                {
                    "$or": [
                        { "inter1": idUser.toString() },
                        { "inter2": idUser.toString() }
                    ]
                },
                {"chats":false},
            )
            .then((result:ActionResult)=>{
                result.result = result.result.map((data:Record<string | number, any>)=>{
                    let id:EntityID=new EntityID();
                    id.setId(data._id);
                    let dispo:Discussion = new Discussion(id);
                    dispo.hydrate(data);
                    return dispo
                });
                resolve(result);
            })  
        })
    }
}
