/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du fournisseur
@created 30/11/2020
*/

import { Controller, DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { TransportServiceManager } from "./transportservicemanager";

@Controller()
@DBPersistence()
export class ProviderServiceManager
{
    private db:Partial<PersistenceManager>={};
    
    constructor(private transportservicemanager:TransportServiceManager){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request:any,response:any):void
    {
        
    }

    /**
     * @description permet de mettre a jour les informations lié a un service d'un fournisseur
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur
     */
    updateService(request:any,response:any):void
    {

    }

    /**
     * @description permet de supprimer un service 
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur'
     */
    deleteService(request:any,response:any):void
    {

    }

    getServiceList(request:any,response:any):void
    {

    }
}

