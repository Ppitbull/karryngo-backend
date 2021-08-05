import { RouterModule } from "../../../karryngo_core/routing/router_module.decorator";
import AuthRequester from "./authrequester";

@RouterModule([
    {
        "url":"/api/requester/profil",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"get",
                "action": "getProfil",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/user/profil/:idProfil",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"get",
                "action": "getUserProfil",
                "params":{
                }
            }
        ]
    },
])
export class ProfilRoutingModule
{}