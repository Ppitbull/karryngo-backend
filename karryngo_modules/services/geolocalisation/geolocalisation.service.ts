import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { Service, ConfigService } from "../../../karryngo_core/decorator";
import { RestApi } from "../../../karryngo_core/http/client/restapi";

@Service()
export class Geolocalisation
{
    @ConfigService()
    private configService:ConfigurableApp;
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