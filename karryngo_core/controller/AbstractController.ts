/**
@author: Cedric nguendap
@description: classe  est une classe abstraite. c'est la classe de base de tous les controller
@created: 23/09/2020
*/

import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { KarryngoApplicationEntity } from "../KarryngoApplicationEntity";
import { PersistenceManager } from "../persistence/PersistenceManager.interface";

export abstract class AbstractController extends KarryngoApplicationEntity
{
    /**
     * @description outils de configuration. a partir de cette objet on obtient tous les paramétres
     *  contenus dans les fichiers de configuration
     * @type ConfigurableApp
     */
    protected configService:ConfigurableApp;

    /**
     * @description outils de persistance qui donnes acces a l'api permettant d'interagir avec la bd
     */
    protected persistenceManager:PersistenceManager;

    /**
     * @constructor
     * @description constructeur ou est injecté les objets de persistance ete de configuration
     * @param persistence outils de persistance
     * @param config outils de configuration
     */
    constructor(persistence:PersistenceManager,config:ConfigurableApp)
    {
        super();
        this.configService=config;
        this.persistenceManager=persistence;
    }
}