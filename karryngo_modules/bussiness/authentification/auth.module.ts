import { RouterModule } from "../../../karryngo_core/routing/router_module.decorator";
import { AuthProvider } from "./authprovider";
import AuthRequester from "./authrequester";

@RouterModule([    
    {
        "url":"/api/auth/provider",
        "module" :AuthProvider,
        "actions":[
            {
                "method":"post",
                "action": "register",
                "params":{
                }
            },
            {
                "method":"get",
                "action": "login"
            }
        ]
    },
    {
        "url":"/api/auth/requester",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"post",
                "action": "register",
                "isSecure": false,
                "params":{
                }
            },
            {
                "method":"get",
                "action": "login",
                "isSecure": false,
                "params": {
                    "email": "string",
                    "password": "string"
                }
            }
        ]
    },
    {
        "url":"/api/auth/forget-password",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"post",
                "action": "forgotPassword",
                "isSecure": false,
                "params":{
                    "email":"string"
                }
            }
        ]
    },
    {
        "url":"/api/auth/reset-password",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"post",
                "action": "resetPassword",
                "params":{
                    "password":"string"
                }
            }
        ]
    },
    {
        "url":"/api/auth/login",
        "module" :AuthRequester,
        "actions":[
            {
                "method":"post",
                "action": "login",
                "isSecure": false,
                "params": {
                    "email": "string",
                    "password": "string"
                }
            }
        ]
    },
    
])
export class AuthModule
{}