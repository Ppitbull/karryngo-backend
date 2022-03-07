/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 28/11/2020
*/

import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { TransportServiceManager } from "./transportservicemanager";
import { Location } from "../../../services/geolocalisation/entities/location";
import { DataBaseException } from "../../../../karryngo_core/exception/DataBaseException";
import { TransactionService } from "../entities/transactionservice";
import { ChatService } from "../../../services/chats/chat.service";
import { Message } from "../../../services/chats/message";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { Discussion } from "../../../services/chats/discussion";
import Configuration from "../../../../config-files/constants";
import { ProviderService } from "../entities/providerservice";
import { Request, Response } from "express";
import { PersistenceManager } from "../../../../karryngo_core/persistence/PersistenceManager.interface";
import { Controller, DBPersistence } from "../../../../karryngo_core/decorator";
import { FinancialTransactionErrorType } from "../../../services/payment/enums";
import { UserHistory } from "../../../services/historique/history";
import { HistoryService } from "../../../services/historique/historyService";

@Controller()
export class ServiceManager
{
    @DBPersistence()
    private db:PersistenceManager;

    constructor(
        private transportServiceManager:TransportServiceManager,
        private chatService:ChatService,
        private userHistoryService:HistoryService
        // private chatRealTimeService:RealTimeChatManager,
        // private realTimeRouterService:RealTimeRouterService
        ){
            // console.log("transportService ",this.transportServiceManager)
        }

    notifyUser(discuss:Discussion,currentUserId:EntityID,transactionID:EntityID,messageContent:any,subType:boolean=false,subMessage:any={}):Message
    {

            let message:Message=new Message(new EntityID());
            message.from.setId(currentUserId.toString());
            
            message.date=(new Date()).toISOString();
            message.content=messageContent;

            message.to.setId(
                currentUserId.toString()==discuss.inter1.toString()
                ?discuss.inter2.toString()
                :discuss.inter1.toString()
            );
            return message;
    }

   rechercherFounisseurProximite(zone:Location):Promise<ActionResult>
   {
       return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(Configuration.collections.provider,
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
                //on resoud avec le resultat
                data.result=data.result.map((provider:Record<string, any>)=>{
                    let id:EntityID=new EntityID();
                    id.setId(provider._id);
                    let pro:ProviderService=new ProviderService(id);
                    
                    pro.hydrate(provider);
                    return pro;
                })
                resolve(data);
            })
            .catch((error:ActionResult)=>{
                reject(error);
            })

       });       
   }

    startTransaction(request:any,response:any):void
    {
        let currentUserId:EntityID = new EntityID();
        currentUserId.setId(request.decoded.id);
        
        // console.log(this.transportServiceManager)
        this.transportServiceManager.startTransaction(
            request.body.idService,
            request.body.idProvider,
            request.body.idRequester)
        .then((data:ActionResult)=>{
            let idTransaction:EntityID=new EntityID();
            idTransaction.setId(data.result.idTransaction);

            let discution:Discussion=new Discussion(new EntityID());

            discution.idProject=request.body.idService
            discution.inter1.setId(request.body.idProvider);
            discution.inter2.setId(request.body.idRequester)

            let message:Message=this.notifyUser(discution,currentUserId,idTransaction,"you have been selected to carry out this project")
            let idProject:EntityID=new EntityID();
            idProject.setId(request.body.idService);

            
            discution.idTransaction=data.result.idTransaction;

            
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
        let idTransaction:EntityID=new EntityID();
        idTransaction.setId(request.body.idTransaction);
        // console.log("data body ", request.body)
        let idService:EntityID=new EntityID();
        idService.setId(request.body.idService);

        let currentUserId:EntityID = new EntityID();
        currentUserId.setId(request.decoded.id);

        this.transportServiceManager.acceptServicePrice(
           idService,idTransaction
        ).then((result:ActionResult)=>this.chatService.findDisccussByTransactionID(idTransaction))
        .then((data:ActionResult)=>{
            let message:Message=this.notifyUser(data.result,currentUserId,idTransaction,"the price has been accepted")
            return this.chatService.send(message,data.result.id.toString())            
        })
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Price setted successfully",
            })
        })
        .catch((error:ActionResult) => {
            let code=500;
            if(error.resultCode==DataBaseException.DATABASE_UNKNOW_ERROR) code=404;
            else if(error.resultCode==ActionResult.RESSOURCE_ALREADY_EXIST_ERROR) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        });
    }
    checkPaiement(request:any,response:Response):void
    {
        let refID=request.params.ref;
        let userID:EntityID=new EntityID();
        userID.setId(request.decoded.id);

        if(refID==null || refID==undefined)
        {
            response.status(400).json({
                resultCode:ActionResult.INVALID_ARGUMENT,
                message:"Request reference not provided"
            })
        }
        else
        {
            this.transportServiceManager.checkPaiement(parseInt(refID),userID)
            .then((result:ActionResult)=>{
                response.status(200).json({
                    resultCode:ActionResult.SUCCESS,
                    message:"Payment transaction found",
                    data:result.result.toString()
                })
            })
            .catch((error:ActionResult)=>{
                console.log("Error ",error)
                let code=500;
                let resultCode=error.resultCode;
                let message=error.message;
                if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                    code=404;
                    resultCode=-1;
                    message="Payment transaction not found";
                }
                response.status(code).json({
                    resultCode,
                    message
                })
            })
        }
    }

    updateStatus(request:any,response:any):void
    {
        
    }

    makePaiement(request:any,response:any):void
    {

        let serviceID=new EntityID();
        serviceID.setId(request.body.idService);
        let currentUserId:EntityID = new EntityID();
        console.log("request id ",request.decoded.id)
        currentUserId.setId(request.decoded.id);
        let idTransaction:EntityID=new EntityID();
        let history:UserHistory;
        this.transportServiceManager.makePaiement(serviceID,request.body.paiement_mode,currentUserId)
        .then((data:ActionResult)=> 
        { 
            history=data.result.history;
            idTransaction.setId(data.result.service.idSelectedTransaction)
            return this.chatService.findDisccussByTransactionID(idTransaction)
        })
        .then((data:ActionResult)=> {
            let message:Message=this.notifyUser(data.result,currentUserId,idTransaction,"the payment has been confirmed")            
            return this.chatService.send(message,data.result.id.toString())     
        })
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful confirmation paiement",
                data:history.financialTransaction.toString()
            })
        })
        .catch((error:ActionResult)=>{{
            console.log("Error ",error)
            let code=500;
            let resultCode=error.resultCode;
            let message=error.message;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                code=404;
                resultCode=-1;
                message="Service not found";
            }
            else if(error.resultCode==ActionResult.INVALID_ARGUMENT)
            {
                code=400;
                resultCode=-3;
                message="Cannot make paiement in that step of transaction";
            }
            else if(error.resultCode==FinancialTransactionErrorType.BURER_NOT_FOUND_ERROR)
            {
                code=400;
                resultCode=-201;
                message="Service requester payment account not found";
            }
            else if(error.resultCode==FinancialTransactionErrorType.INSUFFICIENT_AMOUNT_ERROR)
            {
                code=400;
                resultCode=-204;
                message="Insufficient account amount";
            }
            else if(error.resultCode==FinancialTransactionErrorType.PAIMENT_METHOD_NOT_FOUND)
            {
                code=400;
                resultCode=-205;
                message="payment method not found";
            }
            response.status(code).json({
                resultCode,
                message
            })
        }})
    }
    startRunningTransaction(request:any,response:any):void
    {
        let idTransaction:EntityID = new EntityID();
        idTransaction.setId(request.body.idTransaction);

        let currentUserId:EntityID = new EntityID();
        currentUserId.setId(request.decoded.id);
        // console.log(request.body)
        this.transportServiceManager.startRunningTransaction(idTransaction)
        .then((data:ActionResult)=> this.chatService.findDisccussByTransactionID(idTransaction))
        .then((data:ActionResult)=> {
            let message:Message=this.notifyUser(data.result,currentUserId,idTransaction,"package transport started")
            
            return this.chatService.send(message,data.result.id.toString())     
        })
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful start running transaction",
            })
        })
        .catch((error:ActionResult)=>{{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else if(error.resultCode==ActionResult.INVALID_ARGUMENT) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        }})
    }
    endTransaction(request:any,response:any):void
    {
        let idTransaction:EntityID = new EntityID();
        idTransaction.setId(request.body.idTransaction);

        let currentUserId:EntityID = new EntityID();
        currentUserId.setId(request.decoded.id);

        this.transportServiceManager.endTransaction(idTransaction)
        .then((data:ActionResult)=> this.chatService.findDisccussByTransactionID(idTransaction))
        .then((data:ActionResult)=> {
            let message:Message=this.notifyUser(data.result,currentUserId,idTransaction,"package transport ended")
            
            return this.chatService.send(message,data.result.id.toString())     
        })
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful start end",
            })
        })
        .catch((error:ActionResult)=>{{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else if(error.resultCode==ActionResult.INVALID_ARGUMENT) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        }})
    }

    getTransaction(request:Request,response:any):void
    {
        let idTransaction=new EntityID();
        idTransaction.setId(request.params.idTransaction);
        this.transportServiceManager.getTransaction(idTransaction)
        .then((data:ActionResult)=> response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Transaction found",
                result:data.result.toString()
            })
        )
        .catch((error:ActionResult)=>{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            });
        })
    }

    updatePrice(request:any,response:any):void
    {
        let idTransaction:EntityID = new EntityID();
        idTransaction.setId(request.body.idTransaction);

        let trans:TransactionService;
        let discuss:Discussion;
        let message:Message;

        let currentUserId=new EntityID();
        currentUserId.setId(request.decoded.id);
        //on recupere la transaction
        this.transportServiceManager.getTransaction(idTransaction)
        .then((result:ActionResult)=>{
            trans=result.result;
            try {
                //on met a jour le prix. il lance une exception si le prix ext <0
                trans.updatePrice(request.body.price);
                //on met a jour la transaction dans le service 
                return this.transportServiceManager.updateServicePrice(trans);
            } catch (error) {
                result.resultCode=ActionResult.INVALID_ARGUMENT;
                result.message=error.getMessage();
                result.result=null;
                return Promise.reject(result);
            }
        })//on recherche la discussion en fonction de la transaction
        .then((result:ActionResult)=> this.chatService.findDisccussByTransaction(trans))
        .then((result:ActionResult)=>{
            discuss=result.result;

            let message:Message=this.notifyUser(discuss,currentUserId,idTransaction,"you have been selected to carry out this project")
           
            //on le sauvegarde comme non lu dans la bd
            return this.chatService.send(message,discuss.id.toString())
        })
        .then((result:ActionResult)=>{
            //on notifie les tiers par temps reel
            // this.realTimeRouterService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.to.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:message
            // })
            // this.realTimeRouterService.send({
            //     senderID:message.from.toString().toString(),
            //     receiverID:message.from.toString().toString(),
            //     type:RealTimeChatMessageType.SEND_MESSAGE,
            //     error:RealTimeInitErrorType.SUCCESS,
            //     data:{
            //         idDisccuss:discuss.id.toString(),
            //         idTransaction:trans.id.toString(),
            //         message:message.toString()
            //     }
            // });

            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Successful update price",
            })
        })
        .catch((error:ActionResult)=>{
            let code=500;
            if(error.resultCode==ActionResult.RESSOURCE_NOT_FOUND_ERROR) code=404;
            else if(error.resultCode==ActionResult.INVALID_ARGUMENT) code=400;
            response.status(code).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })

    }
}