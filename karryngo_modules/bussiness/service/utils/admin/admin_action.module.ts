import { RouterModule } from "../../../../../karryngo_core/routing/router_module.decorator";
import { AdminAction } from "./admin_action";

@RouterModule([
    {
        url:'/api/admin/account/accept_as_provider',
        module:AdminAction,
        actions:[
            {
                method:"post",
                action:"acceptAsProvider",
                "params":{
                    "email":"string"
                }
            }
        ]
    },
    {
        url:'/api/admin/account/remove_as_provider',
        module:AdminAction,
        actions:[
            {
                method:"post",
                action:"removeAsProvider",
                "params":{
                    "email":"string"
                }
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
export class AdminActionRoutingModule
{}
