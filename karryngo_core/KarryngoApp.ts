/**
@author: Cedric nguendap
@description: Cette classe est la classe permetant de lancer l'application
@created: 23/09/2020
@version 1.0.0
*/

import { KarryngoApplicationEntity } from "./KarryngoApplicationEntity";
import { KarryngoEntity } from "./KarryngoEntity";
import { KarryngoConfigurationServiceFactory } from "./config/KarryngoConfigurationServiceFactory";
import { KarryngoPersistenceManagerFactory } from "./persistence/KarryngoPersistenceManagerFactory";
import { RouterService } from "./routing/RouterService";
import { InjectorContainer } from "./lifecycle/injector_container";
import { RouterChecker } from "./routing/routerchecker";

export class KarryngoApp extends KarryngoApplicationEntity
{
    /**
     * @description Service de routing permettant le routage des requetes
     * @type RouterService
     */
    protected routerService:RouterService;

    /**
     * @description Permet de contenir l'objet qui fait refference de framework c'est a dire Express
     * @type Express
     */
    protected httpServer:any;

    constructor(router:any,httpServer:any)
    {
        super();       

        this.httpServer=httpServer;

        InjectorContainer.getInstance().bootstrap();
        //obtention de l'instance du service de configuration
        let configurationInstance=InjectorContainer.getInstance().getInstanceOf<KarryngoConfigurationServiceFactory>(KarryngoConfigurationServiceFactory).getInstance();

        //connexion a la bd
        InjectorContainer.getInstance().getInstanceOf<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory).getInstance()
            .connect();

        //obtention de l'instance du service de routage avec injection du service de routing
        //offerte par le framework Express et du service de configuration
        this.routerService=new RouterService(
            configurationInstance,
            InjectorContainer.getInstance().getInstanceOf<RouterChecker>(RouterChecker),
            router);
    }

    /**
     * @description Cette fonction permet de coordonner les étapes nécessaires a la reponse de 
     *  de la requetes envoyé par l'utilisateur.
     *  voir le design partern Injection des dépendances (Inversion de contrôle IoC)
     */
    run():void
    {
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
    hydrate(entity: KarryngoEntity): void {
        throw new Error("Method not implemented.");
    }

    getServer():any 
    {
        return this.httpServer
    }
}