import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RapportContry } from "./rapport_country";

@RouterModule([
    {
        "url":"/api/manager/country/list",
        "module" :RapportContry,
        "actions":[
            {
                "method":"get",
                "action": "getPlatformCountyList"
            }
        ]
    },
])
export class RapportCountyRoutingModule
{}