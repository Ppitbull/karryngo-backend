import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RequesterServiceManager } from "./requesterservicemanager";
import { ServiceManager } from "../transport_transaction/servicemanager"; // cet import est juste pour les tests en attendant de savoir pourquoi il ne prnd pas dans son emplacement initial

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
        "url":"/api/requester/service/make_paiement",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "makePaiement",
                "params":{
                    "idService":"string",
                    "paiement_mode":"string"
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