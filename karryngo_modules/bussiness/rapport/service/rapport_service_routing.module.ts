import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RapportService } from "./rapport_servicemodule";

@RouterModule([
    {
        "url":"/api/manager/service/get_list/:state?/:period?/:time?",
        "module" :RapportService,
        "actions":[
            {
                "method":"get",
                "action": "getServiceListByTime"
            }
        ]
    },
    {
        "url":"/api/manager/service/financial/price/:state?/:period?/:time?",
        "module" :RapportService,
        "actions":[
            {
                "method":"get",
                "action": "getServicePriceByTime"
            }
        ]
    },
])
export class RapportServiceRoutingModule
{}