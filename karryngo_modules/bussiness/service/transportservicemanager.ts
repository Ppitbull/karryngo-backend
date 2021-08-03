/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 22/11/2020
*/

import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { TransportService } from "./entities/transportservice";
import { Location } from "./../../services/geolocalisation/entities/location";
import { InvalideServiceStateException, TransactionService, TransactionServiceState } from "./entities/transactionservice";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ServiceTypeFactory } from "./servicetypefactory";
import { TransportServiceType, TransportServiceTypeState } from "./entities/transportservicetype";
import Configuration from "../../../config-files/constants";
import { Message } from "../../services/chats/message";
import { ToupesuPaiement } from "../../services/toupesu/toupesupayment.service";
import {  ToupesuPaiementMethodFactory } from "../../services/toupesu/toupesupaiementmethodbuilder";
import { Controller, DBPersistence } from "../../../karryngo_core/decorator";
import { FinancialTransactionErrorType, FinancialTransactionState, FinancialTransactionType, PaiementStrategyType } from "../../services/toupesu/enums";
import { UserManagerService } from "../../services/usermanager/usermanager.service";
import { Customer } from "../authentification/entities/customer";
import { Collection } from "mongoose";
import { FinancialTransaction } from "../../services/toupesu/entities/financialtransaction";
import { UserHistory } from "../../services/historique/history";
import { HistoryService } from "../../services/historique/historyService";


@Controller()
export class TransportServiceManager
{
    @DBPersistence()
    private db:PersistenceManager=null;


    constructor(private toupesuPaiement:ToupesuPaiement,
        private userService:UserManagerService,
        private userHistoryService:HistoryService){}


    /**
     * @description Permet au fournisseur du service d'accepté le prix proposé par le demandeur
     * @param idTransportService Identifiant du service (demande de service)
     * @param idTransaction Identifiant de la transaction (entre le demandeur et le fournisseur)
     * @param idProvider Identifiant du fournisseur de service
     * @param price prix lié au service
     */
    acceptServicePrice(idTransportService:EntityID,idTransaction:EntityID):Promise<ActionResult>
    {  //On recherche le service (description) en fonction de son id
        return this.db.findInCollection(Configuration.collections.requestservice,
            {
                "transactions":{
                    $elemMatch:{
                        "_id":idTransaction.toString()
                    }
                }
            }
        )
        .then((data:ActionResult)=>{//si on trouve
            //on instanci le bon type de service en fonction de son champ `type`
            let transportService:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
            transportService.hydrate(data.result[0]);//on l'hydrate avec les données recupéré de la bd
            // console.log("DatSDFqa",transportService)

            //on recupere on instancie la transaction en question
            let transaction:TransactionService=transportService.transactions[0];
            //on essaie car les methodes de l'objet de transaction lance des exceptions celon des cas
            try{
                //on accepte le pix
                transaction.acceptPrice(transportService.suggestedPrice);
                //on met a jour la bd
                return this.db.updateInCollection(
                    Configuration.collections.requestservice,
                    {
                        "_id":idTransportService.toString(),
                        "transactions._id":idTransaction.toString()
                    },
                    {
                        $set:{
                            "idSelectedProvider":transaction.idProvider.toString(),
                            "state":TransportServiceTypeState.SERVICE_IN_TRANSACTION_STATE,
                            "idSelectedTransaction":idTransaction.toString(),
                            "transactions.$.state":transaction.state,
                            "transactions.$.price":transaction.price
                        }
                    }
                );
            }
            catch(e)
            {
                //si une exception est lancé on la capture et on la traite
                data.result=null;
                data.message=e.getMessage();
                data.resultCode=e.getCode();
                return Promise.reject(data);
            }
        })
    }

    /**
     * @description permet de débuté une nouvelle transaction
     * @param idTransportService Identifiant du service (demande de service)
     * @param idProvider Identifiant du fournisseur de service
     * @param idRequester Identifiant du demandeur de service
     */
    startTransaction(idTransportService:String,idProvider:String,idRequester:String):Promise<ActionResult>
    {        
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //on recupere le service en fonction de son id
            let message:Record<string, any>={};
            let idTransaction:EntityID=new EntityID()
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":idTransportService})
            .then((data:ActionResult)=>{ 
                if( data.result[0].idSelectedTransaction==undefined || 
                    data.result[0].idSelectedTransaction==""
                )
                {
                    //si le service peut encore démaré une nouvelle
                    //on instance la service en fonction de son champ `type` en bd
                    let service:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
                    service.hydrate(data.result[0]);//on l'hydrate avec les données de la bd

                    //on creer une nouvelle transaction, on spécific le demandeur et le founisseur et on l'on insere en bd
                    
                    let transaction=new TransactionService(idTransaction)
                    transaction.idProvider=idProvider;
                    transaction.idRequester=idRequester;

                    message={
                        from_city:data.result[0].address.from.city,
                        to_city:data.result[0].address.to.city,
                        title:data.result[0].title
                    };

                     
                    let history:UserHistory=new UserHistory(new EntityID());
                    history.serviceTransportID.setId(service.id.toString());
            
                    let financialTransaction:FinancialTransaction=new FinancialTransaction(new EntityID());
                    financialTransaction.state=FinancialTransactionState.FINANCIAL_TRANSACTION_START;
                    financialTransaction.type=FinancialTransactionType.WITHDRAW;
                    // financialTransaction.ref=FinancialTransaction.generateRef();
                    financialTransaction.error=FinancialTransactionErrorType.NO_ERROR;
            
                    history.financialTransaction=financialTransaction;
            
                    let user:Customer=new Customer();
                    user.id.setId(transaction.idProvider);
                    return this.userHistoryService.addHistory(user,history)
                    .then((result:ActionResult)=> this.db.updateInCollection(Configuration.collections.requestservice,{"_id":idTransportService.toString()},
                    {
                        $push:{"transactions":transaction.toString()}
                    },
                    {} ));//doit précisé que l'on veux insérer dans l'array transactions)
                   
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
            })
            .then((data:ActionResult)=>{
                data.result={
                    message,
                    idTransaction
                };
                resolve(data)
            })
            .catch((error:ActionResult)=>{
                reject(error);
            })
        });
    }

    rejectServicePrice(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //doit faire intéragir les notifications
        })
    }
    updateServicePrice(transaction:TransactionService):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.requestservice,
            {
                "transactions._id":transaction.id.toString()
            },
            {
                $set:{ 
                    "transactions.$.price":transaction.price,
                    "suggestedPrice":transaction.price
                }
            })
    }

    /**
     * @description Permet au demandeur de service d'effectué le paiement sur la plateforme
     * @param idService Identifiant du service
     * @param paiementMethodStrategi  Mode de paiement de type `PaiementStrategyType`
     * @param buyerID Identitifiant du payeur
     */
    makePaiement(idService:EntityID,paiementMethodStrategi:PaiementStrategyType,buyerID:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let transaction:TransactionService;
            let history:UserHistory;

            //on recupere le service en fonction de son identifiant
            this.getServiceById(idService)
            .then((data:ActionResult)=>{ 
                // on instanci le service en fonction de son champ `type`
                
                //on fait le paiement
                try
                {
                    let service:TransportServiceType=data.result;
                    transaction=service.transactions.find((trans:TransactionService)=>trans.id.toString()==service.idSelectedTransaction);
                    transaction.makePaiement();
                    this.userService.findUserById(buyerID)
                    .then((result:ActionResult)=>this.toupesuPaiement.makePaiement(
                        ToupesuPaiementMethodFactory.getMethodPaiment(paiementMethodStrategi),
                        service,result.result[0]
                        ,paiementMethodStrategi))
                    .then((value:ActionResult)=> {
                        history=value.result;
                        return this.db.updateInCollection(Configuration.collections.requestservice,
                            {
                                "id":idService.toString()
                            },
                            {
                                $set:{ 
                                    "transactions.$.state":transaction.state,
                                }
                            })
                    })
                    .then((value:ActionResult)=> {
                        value.result={
                            service,
                            history
                        };
                        resolve(value)
                    })
                }
                catch(error:any)
                {
                    data.resultCode=ActionResult.INVALID_ARGUMENT;
                    data.message=error.getMessage();
                    data.result=null;
                    return Promise.reject(data);
                } 
            })
            .catch((error:ActionResult)=>reject(error))
        })
        
    }

    checkPaiement(refID:number,buyerID:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            let userHistory:UserHistory;
            this.userHistoryService.findHistoryByRefTransaction(refID)
            .then((result:ActionResult)=>{
                userHistory=result.result;
                return this.getServiceById(userHistory.serviceTransportID)
            })
            .then((result:ActionResult)=>{
                let service:TransportServiceType=result.result;
                let buyer:Customer=new Customer(buyerID);
                return this.toupesuPaiement.checkPaiement(
                    ToupesuPaiementMethodFactory.getMethodPaiment(userHistory.financialTransaction.paiementMode),
                    service,
                    userHistory.financialTransaction,
                    buyer,
                    userHistory.financialTransaction.paiementMode
                )
            })
            .then((result:ActionResult)=>
            {
                let financialTransaction:FinancialTransaction=userHistory.financialTransaction;
                financialTransaction.state=result.result.state;
                financialTransaction.endDate=result.result.endDate;
                result.result=financialTransaction;
                resolve(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }

    startRunningTransaction(idTransaction:EntityID):Promise<ActionResult>
    {
        return this.getTransaction(idTransaction)
            .then((result:ActionResult)=>{

                 let transaction:TransactionService=result.result;
                 try {
                    transaction.startService();
                    return this.db.updateInCollection(Configuration.collections.requestservice,
                        {
                            "transactions._id":transaction.id.toString()
                        },
                        {
                            $set:{ 
                                "transactions.$.state":transaction.state,
                            }
                        });
                 } catch (error) {
                    result.resultCode=ActionResult.INVALID_ARGUMENT;
                    result.message=error.getMessage();
                    result.result=null;
                    return Promise.reject(result);
                 }
            })
        
    }
    /**
     * 
     * @param idService identifiant du service
     * @param idTransaction identifiant de la transaction
     */
    endTransaction(idTransaction:EntityID):Promise<ActionResult>
    {
        return this.getTransaction(idTransaction)
            .then((result:ActionResult)=>{

                 let transaction:TransactionService=result.result;
                 try {
                    transaction.serviceDone();
                    return this.db.updateInCollection(Configuration.collections.requestservice,
                        {
                            "transactions._id":transaction.id.toString()
                        },
                        {
                            $set:{ 
                                "transactions.$.state":transaction.state,
                            }
                        });
                 } catch (error) {
                    result.resultCode=ActionResult.INVALID_ARGUMENT;
                    result.message=error.getMessage();
                    result.result=null;
                    return Promise.reject(result);
                 }
            })
    }
    getTransaction(idTransaction:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(Configuration.collections.requestservice,
                {
                    "transactions":{
                        $elemMatch:{
                            "_id":idTransaction.toString()
                        }
                    }
                },
            )
            .then((data:ActionResult)=>{
                
                let transaction:TransactionService = new TransactionService();
                transaction.hydrate(data.result[0].transactions[0]);
                console.log("Transaction ",transaction)
                data.result=transaction;
                resolve(data);
            })
        })
    }

    getServiceById(serviceID:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>{
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":serviceID})
            .then((result:ActionResult)=>{
                if(result.result.length==0)
                {
                    result.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    result.result=null;
                    return reject(result);
                }
                let service:TransportServiceType=ServiceTypeFactory.getInstance(result.result.type);
                service.hydrate(result.result);
                result.result=service;
                resolve(result)
            })
            .catch((error:ActionResult)=>reject(error))
        })
    }

    updatePaiementStatus():Promise<ActionResult>
    {
        return new Promise<ActionResult>((resove,reject)=>{
            
        }) 
    }
}