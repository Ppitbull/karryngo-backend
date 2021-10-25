import { Controller } from "../../../karryngo_core/decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ChatService } from "../../services/chats/chat.service";
import { Discussion } from "../../services/chats/discussion";
import { Message } from "../../services/chats/message";
import { RealTimeChatManager } from "./chat-realtimemanager";

@Controller()
export class ChatManager
{
    constructor(private chatService:ChatService,
            chatRealTimeService:RealTimeChatManager
        ){}

    addMessage(request:any,response:any):void
    {
        let message:Message=new Message(new EntityID());
        message.hydrate(request.body);
        message.id=new EntityID();
        if(({}).constructor==message.content.constructor)
        {
            
        }
        this.chatService.send(message,request.body.idDiscussion)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:{
                    idMessage:message.id,
                    message:"Message send successfully"
                },
                result:null,
            });
        })
        .catch((error:ActionResult)=>{
            response.status(400).json(error.toString());
        })
    }
    getTransactionMessageList(request:any,response:any):void
    {
        this.chatService.readAll(request.body.idDiscussion)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"List of messages",
                result:data.result,
            });
        })
        .catch((error:ActionResult)=>{
            response.status(400).json(error.toString());
        })
    }
    getUnreadDiscution(request:any,response:any):void
    {
        this.chatService.getUnreadDiscution()
        .then((data:ActionResult)=> response.status(200).json({
            resultCode:ActionResult.SUCCESS,
            message:"List of unread message",
            result:data.result
        }))
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }));
    }

    getDiscutionList(request:any,response:any):void
    {
        let id:EntityID=new EntityID();
        id.setId(request.decoded.id);
        this.chatService
        .getDiscussionList(id)
        .then((result)=>{
            response.status(200).json({
                resultCode:result.resultCode,
                result:result.result.map((disc:Discussion)=>disc.toString())
            })
        })
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }));
    }


    markAsRead(request:any,response:any):void
    {
        this.chatService.markAsRead(request.body.idDiscussion,request.body.idMessage)
        .then((data:ActionResult)=>response.status(200).json({
            resultCode:ActionResult.SUCCESS,
            message:"message has been marked as read successfully"
        }))
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }))
    }

}