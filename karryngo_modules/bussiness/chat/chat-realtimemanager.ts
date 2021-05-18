import { ConfigService, Controller, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ChatService } from "../../services/chats/chat.service";
// import {Server, Socket } from "socket.io"
import { KarryngoApp } from "../../../karryngo_core/KarryngoApp";
import * as http from 'http'
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { RealTimeErrorType, RealTimeEvent, RealTimeInitErrorType, RealTimeMessage, RealTimeMessageType, UNKNOW_SENDER } from "../../services/realtime/realtime-protocole";
import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { RouterChecker } from "../../../karryngo_core/routing/routerchecker";
import { RealTimeService } from "../../services/realtime/realtime.service";
import { KarryngoEventEmitter } from "../../../karryngo_core/event/kevent";
import { RealTimeRouterService } from "../../services/realtime/router-realtime.service";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Discussion } from "../../services/chats/discussion";
import { Message } from "../../services/chats/message";

export enum RealTimeChatMessageType
{
    SEND_MESSAGE="send_message",
    GET_DISCUSSIONS="get_discussions",
    GET_MESSAGE_OF_DISCUSION="get_message_discussion",
    MARK_MESSAGE_AS_READ="mark_message_as_read"
}

export enum RealTimeChatError
{
    MESSAGE_NOT_EXIST,

}


@ConfigService()
@Controller()
export class RealTimeChatManager
{
    configService:any={};
    
    constructor(
        // private realtimeService:RealTimeService,
        private chatService:ChatService,
        private eventEmiter:KarryngoEventEmitter,
        // private routerRealTimeService:RealTimeRouterService
        ){
                // this.eventEmiter.on(RealTimeEvent.REALTIME_CONNEXION_STARTED,(socket:any)=>this.init(socket))
    }
    init(socket:any)
    {

        // socket.on(RealTimeChatMessageType.GET_DISCUSSIONS,(data:RealTimeMessage)=>{
        //     let senderId=new EntityID();
        //     senderId.setId(data.senderID);
        //     // console.log("senderID ",senderId.toString())
        //     this.chatService.getDiscussionList(senderId)
        //     .then((result:ActionResult)=>{
        //         // console.log("Realt time discu: ",result)
        //         this.routerRealTimeService.send({
        //             senderID:UNKNOW_SENDER,
        //             receiverID:data.senderID,
        //             type:RealTimeChatMessageType.GET_DISCUSSIONS,
        //             data:result.result.map((data:Discussion)=>data.toString()),
        //             error:RealTimeInitErrorType.SUCCESS
        //         });

        //     })
        //     .catch((error:ActionResult)=>{
        //         this.routerRealTimeService.send({
        //             senderID:UNKNOW_SENDER,
        //             receiverID:data.senderID,
        //             type:RealTimeChatMessageType.GET_DISCUSSIONS,
        //             error:RealTimeInitErrorType.UNKNOW_ERROR
        //         })
        //     })
        // })
    }

    notifyUser(discuss:Discussion,currentUserId:EntityID,transactionID:EntityID,messageContent:any,subType:boolean=false,subMessage:any={}):Message
    {
            let message:Message=new Message(new EntityID());
            message.from.setId(currentUserId.toString().toString());
            message.date=(new Date()).toISOString();
            message.content=messageContent;
            message.to.setId(
                currentUserId.toString().toString()==discuss.inter1.toString()
                ?discuss.inter2.toString()
                :discuss.inter1.toString()
            );

            // this.routerRealTimeService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.to.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:{
            //         idDisccuss:discuss.id.toString(),
            //         idTransaction:transactionID.toString().toString(),
            //         message:message.toString()
            //     }
            // })

            // this.routerRealTimeService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.from.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:{
            //         idDisccuss:discuss.id.toString(),
            //         idTransaction:transactionID.toString().toString(),
            //         message:message.toString()
            //     }
            // });
            return message;
    }
}