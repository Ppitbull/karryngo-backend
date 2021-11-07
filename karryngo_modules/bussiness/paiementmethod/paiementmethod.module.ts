import { RouterModule } from "../../../karryngo_core/routing/router_module.decorator";
import { PaiementMethodController } from "./PaiementMethodController";


@RouterModule([
    {
        "url":"/api/user/paiementmethod/list",
        "module" :PaiementMethodController,
        "actions":[
            {
                "method":"get",
                "action": "getPaiementList",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/user/paiementmethod/add",
        "module" :PaiementMethodController,
        "actions":[
            {
                "method":"post",
                "action": "addPaiementMethod",
                "params":{
                }
            }
        ]
    },
])
export class ProfilRoutingModule
{}