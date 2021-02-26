import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { ConfigService, Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { RestApi } from "../../../karryngo_core/http/client/restapi";

@Service()
@ConfigService()
export class Geolocalisation
{
    private configService:any={};
    private configMap:{key?:string}={};
    
    constructor(private request:RestApi)
    {
        this.configMap = {
            key:this.configService.getValueOf("googleapis").apikey
        };
    } 


    init()
    {
        
    }
}