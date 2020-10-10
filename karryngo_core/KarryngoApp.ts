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

export class KarryngoApp extends KarryngoApplicationEntity
{

    /**
     * @description Factory (usine a fabrication d'objet) permettant de creer une instance du service
     *  de configuration. dépendant du type de service a utiliser (a base de fichier JSON; XML...)
     * voir design partern Factory
     * @type configurationServiceFactory
     */
    protected configurationServiceFactory:KarryngoConfigurationServiceFactory;

    /**
     * @description Factory permettant de creer une unité de persistance.
     * @type  KarryngoPersistenceManagerFactory
     */
    protected persistanceManagerFactory:KarryngoPersistenceManagerFactory;

    /**
     * @description Unité de persistance.
     * @type  PersistenceManager
     */
    protected persistenceManagerInstance:PersistenceManager;

    /**
     * @description Service de routing permettant le routage des requetes
     * @type RouterService
     */
    protected routerService:RouterService;

    constructor()
    {
        super();
        //instanciation du factory du service de configuration
        this.configurationServiceFactory=new KarryngoConfigurationServiceFactory();

        //obtention de l'instance du service de configuration a partir du factory
        let configurationServiceIntance=this.configurationServiceFactory.getInstance();

        //obtention de l'instance du factory de persistance avec injection de service de configuration
        this.persistanceManagerFactory=new KarryngoPersistenceManagerFactory(configurationServiceIntance);
        
        //obtention de l'instance du service de persistance
        this.persistenceManagerInstance=this.persistanceManagerFactory.getInstance();

        //obtention de l'instance du service de routage avec injection du service de routing
        //offerte par le framework Express et du service de configuration
        this.routerService=new RouterService(configurationServiceIntance,express.Router);
    }

    /**
     * @description Cette fonction permet de coordonner les étapes nécessaires a la reponse de 
     *  de la requetes envoyé par l'utilisateur.
     *  voir le design partern Injection des dépendances (Inversion de contrôle IoC)
     */
    run():void
    {
        //execution du service de routage
        this.routerService.run(this.persistenceManagerInstance);
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