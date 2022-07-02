import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { ProviderServiceManager } from "./providerservicemanager";

@RouterModule([
    {
        "url":"/api/provider/service/add",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "addService",
                "params":{
                    
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/find",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "findServiceProviderByZone", 
                "params":{
                    
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/list",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "getServiceList",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/:idProviderService",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "getService",
                "params":{
                    "idProviderService":"string"
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/vehicle/add",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "addVehicle",
                "params":{
                        "type":"string",
                        "name":"string",
                        "marque":"string",
                        "photo":"string",
                        "placeNumbler":"number",
                        "description":"string"
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/zone/add",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "addZone",
                "params":{
                    "long":"double",
                    "lat":"double",
                    "name":"string",
                    "country":"string",
                    "city":"string"
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/zone/list",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "getZoneList",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/provider/service/vehicle/list",
        "module" :ProviderServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "getVehicleList",
                "params":{
                }
            }
        ]
    },
])
export class ProviderTransportServiceRoutingModule
{}