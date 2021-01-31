/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du fournisseur
@created 30/11/2020
*/

import { Controller, DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ProviderService } from "./entities/providerservice";
import { TransportServiceManager } from "./transportservicemanager";
import { Location } from "./../../services/geolocalisation/entities/location";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Vehicle } from "./entities/vehicle";

@Controller()
@DBPersistence()
export class ProviderServiceManager
{
    private db:PersistenceManager|any={};
    
    constructor(private transportservicemanager:TransportServiceManager){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request:any,response:any):void
    {
        //console.log("Requete ",request.body)
        let pservice:ProviderService=new ProviderService(new EntityID());
        
        let idProviderService = request.decoded.id;
        pservice.title=request.body.title;
        pservice.description=request.body.description;
        pservice.idProvider=idProviderService;
        request.body.zones=request.body.zones || [];

        pservice.deservedZone=request.body.zones.map((local:Record<string,string|number>)=>{
            let location:Location=new Location();
            location.hydrate(local);
            location.id=new EntityID();
            return location;
        });

        request.body.Vehicles=request.body.vehicles || [];
        pservice.listVehicle=request.body.vehicles.map((v:Record<string, any>)=>{
            let vehi:Vehicle=new Vehicle();
            vehi.hydrate(v);
            vehi.id=new EntityID();
            return vehi
        });
        this.db.addToCollection("ProvideService",pservice)
        .then((data:ActionResult)=>{
            response.status(201).json({
                resultCode:ActionResult.SUCCESS,
                message:"Provider service successfully created"
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            });
        })
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
        console.log("Get service")
        this.db.findInCollection("ProvideService",{},50)
        .then((data:ActionResult)=>
        {
            console.log(data)
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Provider service found",
                result:data.result,
            });
        })
        .catch((error:ActionResult)=>
        {
            response.status(200).json({
                message:"Provider service not found",
                resultCode:ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }

    getService(request:any,response:any):void
    {
        console.log("unique")
        let idProviderService=request.body.idProviderService;
        this.db.findInCollection("ProvideService",{"idProvider":idProviderService},1)
        .then((data:ActionResult)=>
        {
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Provider service found",
                result:data.result[0],
            });
        })
        .catch((error:ActionResult)=>
        {
            response.status(404).json({
                message:"Provider service not found",
                resultCode:ActionResult.RESSOURCE_NOT_FOUND_ERROR,
                result:[]
            });
        });
    }

    addZone(request:any,response:any):void
    {
        /*let idProviderService=request.body.idProviderService;
        //on recupere le service en fonction de son id
        this.db.findInCollection("ProvideService",{"idProvider":idProviderService},1)
        .then((data:ActionResult)=>{ 
            if( data.result.length!=0)
            {
                let pservice:ProviderService=new ProviderService(new EntityID());
                pservice.hydrate(data.result[0]);//on l'hydrate avec les données de la bd

                //on creer une nouvelle transaction, on spécific le demandeur et le founisseur et on l'on insere en bd
                
                let transaction=new TransactionService(new EntityID(),service)
                transaction.idProvider=idProvider;
                transaction.idRequester=idRequester;
                return this.db.addToCollection("RequestService",transaction);//doit précisé que l'on veux insérer dans l'array transactions
            }
            else
            {
                //si on ne peut plus créer une transaction a cette étape on rejete la promsee
                // Voir document de spécification technique pour plus d'informations
                data.result=null;
                data.resultCode=ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
                data.message="Impossible de créer une nouvelle transaction car le service est déjà accepté par un fournisseur";
                return Promise.reject(data);
            }
        })*/
    }
}

