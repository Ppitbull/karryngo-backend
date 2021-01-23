import { TransportColisService } from "./entities/transportcolisservice";
import { TransportPersonService } from "./entities/transportpersontservice";
import { TransportServiceType } from "./entities/transportservicetype";

export class ServiceTypeFactory
{
    static getInstance(type:String)
    {
        if(type==TransportPersonService.TYPE) return new TransportPersonService();
        //TransportColisService.TYPE:
        return new TransportColisService();
        
    }
}