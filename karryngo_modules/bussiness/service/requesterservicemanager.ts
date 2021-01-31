/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du demandeur
@created 30/11/2020
*/

import { error } from "console";
import { Controller, DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { CrudService } from "../../services/crud/crud.service";
import { TransportColisService } from "./entities/transportcolisservice";
import { TransportPersonService } from "./entities/transportpersontservice";
import { TransportServiceType } from "./entities/transportservicetype";
import { ServiceManager } from "./servicemanager";
import { TransportServiceManager } from "./transportservicemanager";


export class ServiceTransportBy
{
    static BIKE:String="bike";
    static CAR:String="car";
    static AIRPLANE:String="airplane";
}

@Controller()
@DBPersistence()
export class RequesterServiceManager
{
    private db:any=null;

    constructor(
        private transportservicemanager:TransportServiceManager,
        private serviceManager:ServiceManager,
        private crudService:CrudService
        ){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request:any,response:any):void
    {
        let service:TransportServiceType;
        
        if(request.body.options.is_weak!=undefined)
        {
            console.log("Colis")
            //service pour un colis
            service=new TransportColisService(new EntityID());
        }
        else
        {
            service=new TransportPersonService(new EntityID());            
        }
        service.hydrate(request.body);
        service.id=new EntityID();
        console.log("Body ",service)
        //sauvegarde en BD
        let serviceData = {
            "idRequester":request.decoded.id,
            "idSelectedProvider":"",
            "idSelectedTransaction":"",
            "providers":[],
            "transactions":[],
            ...service.toString()
        };
        console.log("service ");
        /*this.db.addToCollection("RequestService",serviceData)
        .then((data:any)=>
        {
            //calcul du rayon de couverture

            //recherche des fournisseur a proximité
            this.serviceManager.rechercherFounisseurProximite(service.from,service)
            .then((data:ActionResult)=>this.db.updateInCollection("RequestService",{
                "_id":serviceData._id
            },{"providers":data.result},{}))
            .then((data:ActionResult)=>{
                response.status(201).json({
                    resultCode:ActionResult.SUCCESS,
                    message:"Description saved successfully",
                    result:data.result.splice(0,10)
                });
            })
            .catch((error:ActionResult)=>{
                response.status(500).json({
                    resultCode:error.resultCode,
                    message:error.message
                });
            })          
        })
        .catch((error:ActionResult)=>
        {
            response.status(400).json({
                resultCode:error.resultCode,
                message:error.message
            });
        })  */     
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

    getService(request:any,response:any):void
    {
        let idServiceDescription=request.body.idService;
        this.db.findInCollection("RequestService",{"_id":idServiceDescription})
        .then((data:ActionResult)=>
        {
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Description service found",
                result:data.result[0],
            });
        })
        .catch((error:ActionResult)=>
        {
            response.status(404).json({
                message:"Description not found",
                resultCode:ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }

    getServiceList(request:any,response:any):void
    {
        this.db.findInCollection("RequestService",{})
        .then((data:ActionResult)=>
        {
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Description service found",
                result:data.result,
            });
        })
        .catch((error:ActionResult)=>
        {
            response.status(200).json({
                message:"Description not found",
                resultCode:ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }
}