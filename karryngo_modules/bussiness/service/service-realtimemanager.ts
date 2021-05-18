import { ConfigService, Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { KarryngoEventEmitter } from "../../../karryngo_core/event/kevent";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { RealTimeEvent, RealTimeInitErrorType, RealTimeMessage, RealTimeTransactionError, RealTimeTransactionMessageType, UNKNOW_SENDER } from "../../services/realtime/realtime-protocole";
import { RealTimeService } from "../../services/realtime/realtime.service";
import { RealTimeRouterService } from "../../services/realtime/router-realtime.service";
import { TransportServiceManager } from "./transportservicemanager";


@ConfigService()
@Controller()
export class RealTimeChatManager
{
    configService:any={};
    
    constructor(
        private realtimeService:RealTimeService,
        private eventEmiter:KarryngoEventEmitter,
        private transportServiceManager:TransportServiceManager,
        private routerRealTimeService:RealTimeRouterService,
        )
    {
        this.eventEmiter.on(RealTimeEvent.REALTIME_CONNEXION_STARTED,(socket:any)=>this.init(socket))
    
    }
    init(socket:any)
    {
        console.log("Start transaction socket")
        // socket.on(RealTimeTransactionMessageType.GET_TRANSACTION,(data:RealTimeMessage)=>{
        //     console.log("Transaction here")
        //     let senderId=new EntityID();
        //     senderId.setId(data.senderID);
        //     let serviceID=new EntityID()
        //     serviceID.setId(data.data.idProjet);
        //     let transactionID:EntityID=new EntityID();
        //     transactionID.setId(data.data.idTransaction)
        //     // console.log("senderID ",senderId.toString())
        //     this.transportServiceManager.getTransaction(serviceID,transactionID)
        //     .then((result:ActionResult)=> this.routerRealTimeService.send({
        //         senderID:UNKNOW_SENDER,
        //         receiverID:data.senderID,
        //         type:RealTimeTransactionMessageType.GET_TRANSACTION,
        //         data:result.result.toString(),
        //         error:RealTimeInitErrorType.SUCCESS
        //     }))
        //     .catch((error:ActionResult)=> this.routerRealTimeService.send({
        //         senderID:UNKNOW_SENDER,
        //         receiverID:data.senderID,
        //         type:RealTimeTransactionMessageType.GET_TRANSACTION,
        //         error:RealTimeTransactionError.TRANSACTION_NOT_EXIST
        //     }))
        // })
    }
}