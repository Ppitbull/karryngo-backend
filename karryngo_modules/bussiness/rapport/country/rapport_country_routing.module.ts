import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RapportContry } from "./rapport_country";

@RouterModule([
    {
        "url":"/api/provider/service/vehicle/list",
        "module" :RapportContry,
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
export class RapportCountyRoutingModule
{}