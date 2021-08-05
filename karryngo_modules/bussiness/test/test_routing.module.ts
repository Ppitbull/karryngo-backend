import { RouterModule } from "../../../karryngo_core/routing/router_module.decorator";
import { ControlBussTest } from "./ControlBussTest";

@RouterModule([
    {
        "url":"/api/users",
        "module" :ControlBussTest,
        "actions":[
            {
                "method":"get",
                "action": "getAllUser",
                "isSecure":false
            }
        ]
    },
    {
        "url":"/api/testupload",
        "module" :ControlBussTest,
        "actions":[
            {
                "method":"post",
                "action": "testUpload",
                "isSecure":false
            }
        ]
    },
    {
        "url":"/api/testdownload",
        "module" :ControlBussTest,
        "actions":[
            {
                "method":"get",
                "action": "testdownLoad",
                "isSecure":false
            }
        ]
    }
])
export class TestRoutingModule
{}