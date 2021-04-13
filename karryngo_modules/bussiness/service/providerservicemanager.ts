/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du fournisseur
@created 30/11/2020
*/

import { Controller, DBPersistence, KFileStorage } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { ProviderService } from "./entities/providerservice";
import { TransportServiceManager } from "./transportservicemanager";
import { Location } from "./../../services/geolocalisation/entities/location";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Vehicle } from "./entities/vehicle";
import Configuration from "../../../config-files/constants";
import { KFile } from "../../../karryngo_core/fs/KFile";
import { Address } from "../../services/usermanager/entities/Address";
import { FileService } from "../../services/files/file.service";

@Controller()
@DBPersistence()
export class ProviderServiceManager
{
    private db:any={};
    constructor(private transportservicemanager:TransportServiceManager,
        private fileUploadService:FileService){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request:any,response:any):void
    {
        let idService:EntityID=new EntityID();
        let pservice:ProviderService=new ProviderService(idService);
        
        let idProviderService = request.decoded.id;
        pservice.title=request.body.title;
        pservice.description=request.body.description;
        pservice.idProvider=idProviderService;
        request.body.zones=request.body.zones || [];
        pservice.deservedZone=request.body.zones.map((local:Record<string,string|number>)=>{
            let location:Location=new Location();
            location.hydrate(local);
            return location;
        });

        request.body.Vehicles=request.body.vehicles || [];
        pservice.listVehicle=request.body.vehicles.map((v:Record<string, any>)=>{
            let vehi:Vehicle=new Vehicle();
            vehi.hydrate(v);
            return vehi
        });
        
        pservice.addressForVerification=request.body.addressForVerification.map((add:Record<string | number, any>)=>{
            let ad:Address = new Address(new EntityID());
            ad.hydrate(add);
            return ad;
        })
        
        //upload file
        this.fileUploadService.uploadAll(request.body.documents)
        .then((result)=> {
            // console.log(result);
           return this.db.addToCollection(Configuration.collections.provider,pservice)
        })       
        .then((data:ActionResult)=>{
            //add provider information to db
            response.status(201).json({
                resultCode:ActionResult.SUCCESS,
                message:"Provider service successfully created",
                result:{
                    idService:idService.toString()
                }
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
        this.db.findInCollection(Configuration.collections.provider,{},50)
        .then((data:ActionResult)=>
        {
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
        let idProviderService=request.body.idProviderService;
        this.db.findInCollection(Configuration.collections.provider,{"providerId":idProviderService},1)
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

    addVehicle(request:any,response:any):any
    {
        let vehicule:Vehicle=new Vehicle();
        vehicule.hydrate(request.body);
        this.db.updateInCollection(Configuration.collections.provider,{"providerId":request.decoded.id},{
            $push:{"vehicles":vehicule.toString()}
        })
        .then((data:ActionResult)=>response.status(201).json({
            resultCode:ActionResult.SUCCESS,
            message:"Vehicle added successfully",
            result:{
                idVehicle:vehicule._id.toString()
            }
        }))
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }));
    }
    getVehicleList(request:any,response:any):any
    {
        this.db.findInCollection(Configuration.collections.provider,{"providerId":request.decoded.id},
        {
            projection:{"vehicles":true,_id:false}
        })
        .then((data:ActionResult)=>{
            console.log(data.result[0]);
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"successful vehicle recovery",
                result:data.result[0].vehicles
            });
        })
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }))
    }
    getZoneList(request:any,response:any):any
    {
        this.db.findInCollection(Configuration.collections.provider,{"providerId":request.decoded.id},{
            projection:{"zones":true,_id:false}
        })
        .then((data:ActionResult)=>response.status(200).json({
            resultCode:ActionResult.SUCCESS,
            message:"successful zones recovery",
            result:data.result[0].zones
        }))
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }))
    }
    addZone(request:any,response:any):void
    {
        let zone:Location=new Location();
        zone.hydrate(request.body);

        //on recupere le service en fonction de son id
        this.db.updateInCollection(Configuration.collections.provider,{"providerId":request.decoded.id},{
            $push:{"zones":zone.toString()}
        })
        .then((data:ActionResult)=>response.status(201).json({
            resultCode:ActionResult.SUCCESS,
            message:"Location added successfully",
            result:{
                idLocation:zone._id.toString()
            }
        }))
        .catch((error:ActionResult)=> response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }));
    }
}

