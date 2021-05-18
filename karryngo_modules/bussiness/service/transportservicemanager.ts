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
import { Controller, DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ServiceTypeFactory } from "./servicetypefactory";
import { TransportServiceType, TransportServiceTypeState } from "./entities/transportservicetype";
import Configuration from "../../../config-files/constants";
import { Message } from "../../services/chats/message";

@DBPersistence()
@Controller()
export class TransportServiceManager
{
    private db:any=null;

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
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":idTransportService},1)
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

                    return this.db.updateInCollection(Configuration.collections.requestservice,{"_id":idTransportService.toString()},
                    {
                        $push:{"transactions":transaction.toString()}
                    },
                    {} );//doit précisé que l'on veux insérer dans l'array transactions
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
     * @param idTransaction Identifiant de la transaction
     */
    makePaiement(idTransaction:EntityID):Promise<ActionResult>
    {
        let transaction:TransactionService;

        console.log("Ici le paiement")
            //on recupere le service en fonction de son identifiant
        return this.getTransaction(idTransaction)
        .then((data:ActionResult)=>{ 
            // on instanci le service en fonction de son champ `type`
            
            //on fait le paiement
            try
            {
                transaction=data.result;
                transaction.makePaiement();
                return this.db.updateInCollection(Configuration.collections.requestservice,
                    {
                        "transactions._id":idTransaction.toString()
                    },
                    {
                        $set:{ 
                            "transactions.$.state":transaction.state,
                        }
                    });
            }
            catch(error:any)
            {
                data.resultCode=ActionResult.INVALID_ARGUMENT;
                data.message=error.getMessage();
                data.result=null;
                return Promise.reject(data);
            } 
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
}