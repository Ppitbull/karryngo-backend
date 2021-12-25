"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoApp = void 0;
/**
@author: Cedric nguendap
@description: Cette classe est la classe permetant de lancer l'application
@created: 23/09/2020
@version 1.0.0
*/
const KarryngoApplicationEntity_1 = require("./KarryngoApplicationEntity");
const KarryngoConfigurationServiceFactory_1 = require("./config/KarryngoConfigurationServiceFactory");
const KarryngoPersistenceManagerFactory_1 = require("./persistence/KarryngoPersistenceManagerFactory");
const RouterService_1 = require("./routing/RouterService");
const injector_container_1 = require("./lifecycle/injector_container");
const routerchecker_1 = require("./routing/routerchecker");
const ActionResult_1 = require("./utils/ActionResult");
const app_module_1 = require("../app-module");
const decorator_1 = require("./decorator");
const realtime_service_1 = require("../karryngo_modules/services/realtime/realtime.service");
let KarryngoApp = class KarryngoApp extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    init(router, httpServer, frameworkExpress) {
        this.httpServer = httpServer;
        this.realtimeService = injector_container_1.InjectorContainer.getInstance().getInstanceOf(realtime_service_1.RealTimeService);
        this.realtimeService.setKarryngoApp(this);
        injector_container_1.InjectorContainer.getInstance().bootstrap(app_module_1.ModulesRouting);
        //obtention de l'instance du service de configuration
        let configurationInstance = injector_container_1.InjectorContainer.getInstance().getInstanceOf(KarryngoConfigurationServiceFactory_1.KarryngoConfigurationServiceFactory).getInstance();
        //obtention de l'instance du service de routage avec injection du service de routing
        //offerte par le framework Express et du service de configuration
        this.routerService = injector_container_1.InjectorContainer.getInstance().getInstanceOf(RouterService_1.RouterService);
        this.routerService.configService = configurationInstance;
        this.routerService.routerChecker = injector_container_1.InjectorContainer.getInstance().getInstanceOf(routerchecker_1.RouterChecker);
        this.routerService.frameworkRouter = router;
        frameworkExpress.use((request, response, next) => {
            //connexion a la bd
            injector_container_1.InjectorContainer.getInstance().getInstanceOf(KarryngoPersistenceManagerFactory_1.KarryngoPersistenceManagerFactory).getInstance()
                .connect()
                .then((result) => {
                next();
            })
                .catch((error) => {
                response.status(500).json({
                    resultCode: ActionResult_1.ActionResult.UNKNOW_ERROR,
                    message: "Cannot connect to the bd",
                    result: error
                });
            });
        });
        this.realtimeService.init();
    }
    /**
     * @description Cette fonction permet de coordonner les étapes nécessaires a la reponse de
     *  de la requetes envoyé par l'utilisateur.
     *  voir le design partern Injection des dépendances (Inversion de contrôle IoC)
     */
    run() {
        //execution du service de routage
        this.routerService.run();
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
    getServer() {
        return this.httpServer;
    }
    setServer(server) {
        this.httpServer = server;
    }
    setRouter(router) {
        this.routerService = router;
    }
    setFramewordExpress(express) {
        this.frameworkExpress = express;
    }
};
KarryngoApp = __decorate([
    decorator_1.KarryngoCore()
], KarryngoApp);
exports.KarryngoApp = KarryngoApp;
//# sourceMappingURL=KarryngoApp.js.map