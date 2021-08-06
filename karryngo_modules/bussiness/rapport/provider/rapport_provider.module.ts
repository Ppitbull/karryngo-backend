import { RouterModule } from "../../../../karryngo_core/routing/router_module.decorator";
import { RapportProvider } from "./rapport_provider";

@RouterModule([
    {
        url:'/api/manager/provider/get_by_country/:country?/:type?/:status?',
        module:RapportProvider,
        actions:[
            {
                method:"get",
                action:"getProviderListByParams"
            }
        ]
    },
    // {
    //     "url":"/api/chat/list",
    //     "module" :ChatManager,
    //     "actions":[
    //         {
    //             "method":"get",
    //             "action": "getDiscutionList",
    //             "params":{
    //             }
    //         }
    //     ]
    // },
])
export class RapportProviderRoutingModule
{}