import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { ServiceManager } from "./servicemanager";

@RouterModule([
    {
        "url":"/api/requester/service/check_paiement/:ref",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "checkPaiement",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/requester/service/update_paiement",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "updatePaiement",
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
        "url":"/api/requester/service/end",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "endTransaction",
                "params":{
                    "idTransaction":"string"
                }
            }
        ]
    },
    {
        "url":"/api/requester/service/start",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "startRunningTransaction",
                "params":{
                    "idTransaction":"string"
                }
            }
        ]
    }, 
    {
        "url":"/api/requester/service/transaction/start",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "startTransaction",
                "params":{
                    "idService":"string",
                    "idProvider":"string",
                    "idRequester":"string",
                    "idInitiator":"string"
                }
            }
        ]
    },   
    {
        "url":"/api/requester/service/transaction/find/:idTransaction",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"get",
                "action": "getTransaction",
                "params":{
                    "idTransaction":"string"
                }
            }
        ]
    },
    {
        "url":"/api/requester/service/transaction/accept_price",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "acceptPrice",
                "params":{
                    "idService":"string",
                    "idTransaction":"string"
                }
            }
        ]
    },
    {
        "url":"/api/requester/service/transaction/update_price",
        "module" :ServiceManager,
        "actions":[
            {
                "method":"post",
                "action": "updatePrice",
                "params":{
                    "idTransaction":"string",
                    "idMessage":"string",
                    "price":"string"
                }
            }
        ]
    },
])
export class TransactionRoutingModule
{}