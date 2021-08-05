import { InjectorContainer } from "../lifecycle/injector_container";
import { Action } from "./Action";
import { ActionInterface, RouteInterface } from "./definitions";
import { Route } from "./Route";
import { RouterService } from "./RouterService";

export function RouterModule(routes:RouteInterface[]) {
    return (target: Function) => {
        let routerInstance=InjectorContainer.getInstance().getInstanceOf<RouterService>(RouterService)
        routes.forEach((route:RouteInterface)=>{
            route.isSecure=route.hasOwnProperty("isSecure")?route.isSecure:true;
            let r=new Route(
                route.url,
                route.module,
                route.actions.map((action:ActionInterface)=> new Action(
                    action.method,
                    action.action,
                    action.action.hasOwnProperty("params")?action.params:{},
                    action.hasOwnProperty("isSecure")?action.isSecure:route.isSecure)
                )
            );
            r.secure=route.hasOwnProperty('isSecure');
            routerInstance.addRoute(r)
        })
    };
}
