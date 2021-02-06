/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 28/11/2020
*/

import { DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { CrudService } from "../../services/crud/crud.service";
import { TransportServiceType } from "./entities/transportservicetype";
import { Vehicle } from "./entities/vehicle";
import { TransportServiceManager } from "./transportservicemanager";
import { Location } from "./../../services/geolocalisation/entities/location";
import { ServiceProvider } from "../authentification/entities/serviceprovider";
import { DataBaseException } from "../../../karryngo_core/exception/DataBaseException";
import { InvalideServiceStateException } from "./entities/transactionservice";
import { ChatService } from "../../services/chats/chat.service";
import { Message } from "../../services/chats/message";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Discussion } from "../../services/chats/discussion";

@DBPersistence()
export class ServiceManager
{
    private db:any=null;

    constructor(
        private crudService:CrudService,
        private transportServiceManager:TransportServiceManager,
        private chatService:ChatService
        ){}

   rechercherFounisseurProximite(zone:Location,service:TransportServiceType):Promise<ActionResult>
   {
       return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection("ProvideService",
            {
                "zones":{
                    $elemMatch: {
                        "country":zone.country,
                        "city":zone.city
                    },
                }
            })
            .then((data:ActionResult)=>
            {
                //doit contenir la liste des fournisseurs de service
                // console.log("Found Provider",data)
                //on resoud avec le resultat
                resolve(data);
            })
            .catch((error:ActionResult)=>{
                reject(error);
            })

       });       
   }

    startTransaction(request:any,response:any):void
    {
        console.log("Data",request.body)
        this.transportServiceManager.startTransaction(
            request.body.idService,
            request.body.idProvider,
            request.body.idRequester)
        .then((data:ActionResult)=>{
            
                let to:EntityID=new EntityID();
                to.setId(
                    request.body.idProvider==request.body.idInitiator
                        ?request.body.idRequester
                        :request.body.idProvider
                    );
                
                    let from:EntityID=new EntityID();
                    from.setId(
                        request.body.idProvider==request.body.idInitiator
                            ?request.body.idProvider
                            :request.body.idRequester);
                let idProject:EntityID=new EntityID();
                idProject.setId(request.body.idService);

                let discution:Discussion=new Discussion(new EntityID());
                discution.idProject=idProject
                discution.inter1=to;

                let message:Message=new Message(new EntityID());
                message.to=to;
                message.from=to;
                message.date=(new Date()).toISOString();
                message.content="you have been selected to carry out this project";
                discution.chats.push(message);

                return this.chatService.startDiscussion(discution);
        })
        .then((data:ActionResult) => {
            response.status(201).json({
                resultCode:ActionResult.SUCCESS,
                message:"Transaction started successfully",
            })
        })
        .catch((error:ActionResult)=>{
            let code=500;
            if(error.resultCode==DataBaseException.DATABASE_UNKNOW_ERROR) code=404;
            else if(error.resultCode==ActionResult.RESSOURCE_ALREADY_EXIST_ERROR) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }

    acceptPrice(request:any,response:any):void
    {
        this.transportServiceManager.acceptServicePrice(
            request.body.idService,
            request.body.idTransaction,
            request.body.idProvider,
            request.body.price
        ).then((result:ActionResult) => {
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Price setted successfully",
            })
        }).catch((error:ActionResult) => {
            let code=500;
            if(error.resultCode==DataBaseException.DATABASE_UNKNOW_ERROR) code=404;
            else if(error.resultCode==ActionResult.RESSOURCE_ALREADY_EXIST_ERROR) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        });
    }

    makePaiement(request:any,response:any):void
    {
        this.transportServiceManager.makePaiement(request.body.idService,request.body.idTransaction)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful paiement operation",
            })
        })
        .catch((error:ActionResult)=>{{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else if(error.resultCode==InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_PAIEMENT_STATE_ERROR) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        }})
    }

    endTransaction(request:any,response:any):void
    {
        this.transportServiceManager.endTransaction(request.body.idService,request.body.idTransaction)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful end transaction service",
            })
        })
        .catch((error:ActionResult)=>{{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        }})
    }
}