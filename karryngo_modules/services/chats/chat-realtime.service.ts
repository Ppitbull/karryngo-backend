import { ConfigService, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ChatService } from "./chat.service";

import { KarryngoApp } from "../../../karryngo_core/KarryngoApp";
import * as http from 'http'
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { RealTimeErrorType, RealTimeMessage, RealTimeMessageType } from "../realtime/realtime-protocole";
import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { RouterChecker } from "../../../karryngo_core/routing/routerchecker";
import { RealTimeService } from "../realtime/realtime.service";

@ConfigService()
@Service()
export class RealTimeChatService
{
    
    configService:any={};
    

    constructor(private realtimeService:RealTimeService){
                
    }
    initNewUser()
    {

    }
}