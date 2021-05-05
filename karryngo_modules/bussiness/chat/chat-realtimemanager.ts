import { ConfigService, Controller, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ChatService } from "../../services/chats/chat.service";
import {Server, Socket } from "socket.io"
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
        private realtimeService:RealTimeService,
        private chatService:ChatService,
        private eventEmiter:KarryngoEventEmitter,
        private routerRealTimeService:RealTimeRouterService){
                this.eventEmiter.on(RealTimeEvent.REALTIME_CONNEXION_STARTED,(socket:Socket)=>this.init(socket))
    }
    init(socket:Socket)
    {

        socket.on(RealTimeChatMessageType.GET_DISCUSSIONS,(data:RealTimeMessage)=>{
            let senderId=new EntityID();
            senderId.setId(data.senderID);
            // console.log("senderID ",senderId.toString())
            this.chatService.getDiscussionList(senderId)
            .then((result:ActionResult)=>{
                // console.log("Realt time discu: ",result)
                this.routerRealTimeService.send({
                    senderID:UNKNOW_SENDER,
                    receiverID:data.senderID,
                    type:RealTimeChatMessageType.GET_DISCUSSIONS,
                    data:result.result.map((data:Discussion)=>data.toString()),
                    error:RealTimeInitErrorType.SUCCESS
                });

            })
            .catch((error:ActionResult)=>{
                this.routerRealTimeService.send({
                    senderID:UNKNOW_SENDER,
                    receiverID:data.senderID,
                    type:RealTimeChatMessageType.GET_DISCUSSIONS,
                    error:RealTimeInitErrorType.UNKNOW_ERROR
                })
            })
        })
    }
}