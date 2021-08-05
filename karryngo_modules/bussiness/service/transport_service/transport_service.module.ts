import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RequesterServiceManager } from "./requesterservicemanager";

@RouterModule([
    {
        "url":"/api/requester/service/add",
        "module" :RequesterServiceManager,
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
        "url":"/api/requester/service/list",
        "module" :RequesterServiceManager,
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
        "url":"/api/requester/service/:idService",
        "module" :RequesterServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "updateService",
                "params":{
                    "idService":"string"
                }
            },
            {
                "method":"get",
                "action": "getService",
                "params":{
                    "idService":"string"
                }
            }
        ]
    },
])
export class TransportServiceRoutingModule{}