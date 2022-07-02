"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterModule = void 0;
const injector_container_1 = require("../lifecycle/injector_container");
const Action_1 = require("./Action");
const Route_1 = require("./Route");
const RouterService_1 = require("./RouterService");
function RouterModule(routes) {
    return (target) => {
        let routerInstance = injector_container_1.InjectorContainer.getInstance().getInstanceOf(RouterService_1.RouterService);
        routes.forEach((route) => {
            route.isSecure = route.hasOwnProperty("isSecure") ? route.isSecure : true;
            let r = new Route_1.Route(route.url, route.module, route.actions.map((action) => new Action_1.Action(action.method, action.action, action.action.hasOwnProperty("params") ? action.params : {}, action.hasOwnProperty("isSecure") ? action.isSecure : route.isSecure)));
            r.secure = route.hasOwnProperty('isSecure');
            routerInstance.addRoute(r);
        });
    };
}
exports.RouterModule = RouterModule;
