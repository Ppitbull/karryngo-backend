import { EventEmitter } from "events";
import Server, {Socket} from "socket.io"
import { Service } from "../../../karryngo_core/decorator";
// import { KarryngoEventEmitter } from "../../../karryngo_core/event/kevent"
import { KarryngoApp } from "../../../karryngo_core/KarryngoApp";
import { RouterChecker } from "../../../karryngo_core/routing/routerchecker";
import { ChatService } from "../chats/chat.service";
import { RealTimeMessageType, RealTimeMessage, RealTimeErrorType, UNKNOW_SENDER, RealTimeEvent, RealTimeInitMessageType, RealTimeInitErrorType } from "./realtime-protocole";
import { RealTimeRouterService } from "./router-realtime.service";

const io = require('socket.io')

@Service()
export class RealTimeService
{
    private serverSocket:any;
    
    constructor(
        private kcore:KarryngoApp, 
        private routerchecker:RouterChecker,
        private eventEmiter:EventEmitter,
        private routerRealTime:RealTimeRouterService)
    {
        this.serverSocket=new Server(this.kcore.getServer(),{           
           }
       );
        // this.serverSocket=new WebSocket.Server({server:this.kcore.getServer()})

       this.serverSocket.on(RealTimeInitMessageType.NEW_CONNECTION,(socket:Socket)=>{
        console.log("New Connection: ",socket.id)    
        this.handShakeForNewConnection(socket); 
        this.handDisconnect(socket);
        this.handleConnexionError(socket);
        })
        
    }
    handleConnexionError(socket:Socket)
    {
        socket.on(RealTimeInitErrorType.CONNEXION_ERROR, (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
    }
    handDisconnect(socket: Socket) {
        socket.on(RealTimeInitMessageType.DISCONNECT,()=>this.handleDesconnection(socket));
        socket.on(RealTimeInitMessageType.LOGOUT,(data:RealTimeMessage)=>this.handleDesconnection(socket))
    }
    handleDesconnection(socket:Socket)
    {
        console.log("Deconnexion")
        this.routerRealTime.removeSocketUser(socket.id);
        socket.removeAllListeners()
        socket.disconnect(true);
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
                else if(this.routerRealTime.hasSocketUSer(socket.id))
                {
                    this.routerRealTime.send({
                        receiverID:data.senderID,
                        senderID:UNKNOW_SENDER,
                        error:RealTimeInitErrorType.USER_ALREADY_CONNECTED,
                        type:RealTimeInitMessageType.LOGGIN
                    });   
                }
                else 
                {
                    this.routerRealTime.addUser(data.senderID,socket);
                    this.routerRealTime.addSocketUSer(socket.id,data.senderID);
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