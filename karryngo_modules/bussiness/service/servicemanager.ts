/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 28/11/2020
*/

import { Controller } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { TransportServiceManager } from "./transportservicemanager";

@Controller()
export class ServiceManager
{
    constructor(private transportservicemanager:TransportServiceManager){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addProviderService(request:any,response:any):void
    {

    }

    /**
     * @description permet de mettre a jour les informations lié a un service d'un fournisseur
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur
     */
    updateProviderService(request:any,response:any):void
    {

    }

    /**
     * @description permet de supprimer un service 
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur'
     */
    deleteProviderService(request:any,response:any):void
    {

    }

    getProviderServiceList(request:any,response:any):void
    {

    }
    
    /**
     * @description Permet a un demandeur de service de poster  la description d'un service
     * @param request request de l'utilisateur
     * @param response response a envoyer a l'utilisateur
     */
    postServiceDesciption(request:any,response:any):void
    {

    }

    getServiceDescriptionPostInfos(request:any,response:any):void
    {

    }

    getServiceList(request:any,response:any):void
    {

    }


}