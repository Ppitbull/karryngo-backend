import { RouterModule } from "../../../karryngo_core/routing/router_module.decorator";
import { ChatManager } from "./chatmanager";

@RouterModule([
    {
        "url":"/api/chat/list",
        "module" :ChatManager,
        "actions":[
            {
                "method":"get",
                "action": "getDiscutionList",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/chat/unread",
        "module" :ChatManager,
        "actions":[
            {
                "method":"get",
                "action": "getUnreadDiscution",
                "params":{
                }
            }
        ]
    },
    {
        "url":"/api/chat/mark_as_read",
        "module" :ChatManager,
        "actions":[
            {
                "method":"post",
                "action": "markAsRead",
                "params":{
                    "idMessage":"string",
                    "idDiscussion":"string"
                }
            }
        ]
    },
    {
        "url":"/api/chat/add",
        "module" :ChatManager,
        "actions":[
            {
                "method":"get",
                "action": "getTransactionMessageList",
                "params":{
                    "idDiscussion":"string",
                    "from":"string",
                    "to":"string",
                    "date":"string",
                    "title":"string",
                    "content":"string"
                }
            }
        ]
    },
    {
        "url":"/api/chat/message/add",
        "module" :ChatManager,
        "actions":[
            {
                "method":"post",
                "action": "addMessage",
                "params":{
                    "idDiscussion":"string",
                    "from":"string",
                    "to":"string",
                    "date":"string",
                    "title":"string",
                    "content":"string"
                }
            }
        ]
    }
])
export class ChatRoutingModule
{}