/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du demandeur
@created 30/11/2020
*/

import { Request, Response } from "express";
import Configuration from "../../../config-files/constants";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { CrudService } from "../../services/crud/crud.service";
import { TransportColisService } from "./entities/transportcolisservice";
import { TransportPersonService } from "./entities/transportpersontservice";
import { TransportServiceType } from "./entities/transportservicetype";
import { ServiceManager } from "./servicemanager";
import { ServiceTypeFactory } from "./servicetypefactory";
import { TransportServiceManager } from "./transportservicemanager";
import { FileService } from "../../services/files/file.service";
import { ProviderServiceManager } from "./providerservicemanager";
import { Controller, DBPersistence } from "../../../karryngo_core/decorator";
import { UserHistory } from "../../services/historique/history";
import { HistoryService } from "../../services/historique/historyService";
import { User } from "../../services/usermanager/entities/User";
import { FinancialTransaction } from "../../services/toupesu/entities/financialtransaction";
import { FinancialTransactionErrorType, FinancialTransactionState, FinancialTransactionType } from "../../services/toupesu/enums";
import { Customer } from "../authentification/entities/customer";


export class ServiceTransportBy
{
    static BIKE:String="bike";
    static CAR:String="car";
    static AIRPLANE:String="airplane";
}

@Controller()
export class RequesterServiceManager
{
    @DBPersistence()
    private db:PersistenceManager;

    constructor(
        private transportservicemanager:TransportServiceManager,
        private serviceManager:ServiceManager,
        private crudService:CrudService,
        private fileUploadService:FileService,
        private providerService:ProviderServiceManager,
        private userHistoryService:HistoryService
        ){}

    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request:any,response:any):void
    {

        let service:TransportServiceType;
            
        if(request.body.options.typeof!=TransportPersonService.typeof)
        {
            //service pour un colis
            service=new TransportColisService(new EntityID());
        }
        else
        {
            service=new TransportPersonService(new EntityID());            
        }
        service.hydrate(request.body);
        service.idRequester=request.decoded.id

        this.fileUploadService.uploadAll(request.body.options.images)
        .then((result:ActionResult)=>{
            service.images=result.result;
            return this.db.addToCollection(Configuration.collections.requestservice,service);
        })
        .then((result:ActionResult)=>{
            let history:UserHistory=new UserHistory(new EntityID());
            history.serviceTransportID.setId(service.id.toString());

            let financialTransaction:FinancialTransaction=new FinancialTransaction(new EntityID());
            financialTransaction.state=FinancialTransactionState.FINANCIAL_TRANSACTION_START;
            financialTransaction.type=FinancialTransactionType.DEPOSIT;
            // financialTransaction.ref=FinancialTransaction.generateRef();
            financialTransaction.error=FinancialTransactionErrorType.NO_ERROR;

            history.financialTransaction=financialTransaction;

            let user:Customer=new Customer();
            user.id.setId(service.idRequester);
            return this.userHistoryService.addHistory(user,history)
        })
        .then((result:ActionResult)=>{
            response.status(201).json({
                resultCode:ActionResult.SUCCESS,
                message:"Requester service successfully created",
                result:{
                    idService:service.id.toString()
                }
            })
        })
        .catch((error:ActionResult)=>
        {
            response.status(400).json({
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
        this.db.updateInCollection(Configuration.collections.requestservice,{"_id":request.params.idService},request.body,{})
        .then((data:ActionResult)=>this.db.findInCollection(Configuration.collections.requestservice,{"_id":request.params.idService}))
        .then((data:ActionResult)=>{
            let service:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
            return this.providerService.findProvider(request,response,service._id,service,"Requester service updated successfully")
        })
        .catch((error:ActionResult)=>response.status(500).json({
            resultCode:error.resultCode,
            message:error.message
        }));
    }

    /**
     * @description permet de supprimer un service 
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur'
     */
    deleteService(request:any,response:any):void
    {

    }

    getService(request:Request,response:Response):void
    {
        let idServiceDescription=new EntityID();
        idServiceDescription.setId(request.params.idService);
        this.transportservicemanager.getServiceById(idServiceDescription)
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
        this.db.findInCollection(Configuration.collections.requestservice,{"idRequester":request.decoded.id})
        .then((data:ActionResult)=>
        {
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Description service foundds",
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