import {Server, Socket } from "socket.io"
import { ConfigService, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { KarryngoEventEmitter } from "../../../karryngo_core/event/kevent"
import { KarryngoApp } from "../../../karryngo_core/KarryngoApp";
import { RouterChecker } from "../../../karryngo_core/routing/routerchecker";
import { ChatService } from "../chats/chat.service";
import { RealTimeMessageType, RealTimeMessage, RealTimeErrorType, UNKNOW_SENDER, RealTimeEvent, RealTimeInitMessageType, RealTimeInitErrorType } from "./realtime-protocole";
import { RealTimeRouterService } from "./router-realtime.service";


@ConfigService()
@Service()
export class RealTimeService
{
    private serverSocket:Server;
    
    constructor(
        private kcore:KarryngoApp, 
        private routerchecker:RouterChecker,
        private eventEmiter:KarryngoEventEmitter,
        private routerRealTime:RealTimeRouterService){
        this.serverSocket=new Server(this.kcore.getServer(),{
            cors:{
               origin: ["http://localhost:4200"]
            } 
           }
       );

       this.serverSocket.on(RealTimeInitMessageType.NEW_CONNECTION,(socket:Socket)=>{
        console.log("New Connection")    
        this.handShakeForNewConnection(socket); 
        this.handDisconnect(socket)
        })
    }
    handDisconnect(socket: Socket) {
        socket.on(RealTimeInitMessageType.DISCONNECT,()=>socket.removeAllListeners());
        socket.on(RealTimeInitMessageType.LOGOUT,(data:RealTimeMessage)=>{
            this.routerRealTime.removeUser(data.senderID);
            this.eventEmiter.emit(RealTimeEvent.REALTIME_CONNEXION_ENDED,data.senderID);
            console.log('Disconnexion')
            socket.disconnect();
        })
    }
    handShakeForNewConnection(socket:Socket)
    {
        socket.on(RealTimeInitMessageType.LOGGIN,(data:RealTimeMessage)=>{
            this.routerchecker.checkApiAccess(data.data.token)
            .then(()=>{
                if(this.routerRealTime.hasUser(data.senderID))
                {
                    this.routerRealTime.send({
                        receiverID:data.senderID,
                        senderID:UNKNOW_SENDER,
                        error:RealTimeInitErrorType.USER_ALREADY_EXIST,
                        type:RealTimeInitMessageType.LOGGIN
                    });                    
                }
                else 
                {
                    this.routerRealTime.addUser(data.senderID,socket);
                    this.routerRealTime.send({
                        senderID:UNKNOW_SENDER,
                        receiverID:data.senderID,
                        error:RealTimeInitErrorType.SUCCESS,
                        type:RealTimeInitMessageType.LOGGIN
                    });
                }
                this.eventEmiter.emit(RealTimeEvent.REALTIME_CONNEXION_STARTED,socket);
            })
            .catch(()=>{
                this.routerRealTime.send({
                    senderID:UNKNOW_SENDER,
                    receiverID:data.senderID,
                    error:RealTimeInitErrorType.INVALID_USER_TOKEN,
                    type:RealTimeInitMessageType.LOGGIN
                });
                socket.disconnect();
            })
        })
    }
}