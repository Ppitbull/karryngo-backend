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
import * as express from 'express';
import { isNonNullExpression } from "typescript";
import { PersistenceManager } from "./persistence/PersistenceManager.interface";
import { InjectorContainer } from "./lifecycle/injector_container";

export class KarryngoApp extends KarryngoApplicationEntity
{
    /**
     * @description Service de routing permettant le routage des requetes
     * @type RouterService
     */
    protected routerService:RouterService;

    constructor(router:any)
    {
        super();       
        InjectorContainer.getInstance().bootstrap();
        //obtention de l'instance du service de configuration
        let configurationInstance=InjectorContainer.getInstance().getInstanceOf<KarryngoConfigurationServiceFactory>(KarryngoConfigurationServiceFactory).getInstance();
  
        //connexion a la bd
        InjectorContainer.getInstance().getInstanceOf<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory).getInstance()
            .connect();

        //obtention de l'instance du service de routage avec injection du service de routing
        //offerte par le framework Express et du service de configuration
        this.routerService=new RouterService(configurationInstance,router);
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
}