import { Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ChatService } from "../../services/chats/chat.service";
import { Message } from "../../services/chats/message";

@Controller()
export class ChatManager
{
    constructor(private chatService:ChatService){}

    addMessage(request:any,response:any):void
    {
        let message:Message=new Message(new EntityID());
        message.hydrate(request.body);
        message.id=new EntityID();
        this.chatService.send(message,request.body.idDiscussion)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Message send successfully",
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
}