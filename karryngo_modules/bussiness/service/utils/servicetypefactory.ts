import { TransportColisService } from "../entities/transportcolisservice";
import { TransportPersonService } from "../entities/transportpersontservice";

export class ServiceTypeFactory
{
    static getInstance(type:String)
    {
        if(type==TransportPersonService.TYPE) return new TransportPersonService();
        //TransportColisService.TYPE:
        return new TransportColisService();
        
    }
}