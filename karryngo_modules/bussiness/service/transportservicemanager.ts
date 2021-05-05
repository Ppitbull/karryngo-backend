/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 22/11/2020
*/

import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { TransportService } from "./entities/transportservice";
import { Location } from "./../../services/geolocalisation/entities/location";
import { TransactionService, TransactionServiceState } from "./entities/transactionservice";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Controller, DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ServiceTypeFactory } from "./servicetypefactory";
import { TransportServiceType } from "./entities/transportservicetype";
import Configuration from "../../../config-files/constants";

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
    acceptServicePrice(idTransportService:String,idTransaction:String,idProvider:String,price:Number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //On recherche le service (description) en fonction de son id
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":idTransportService},1)
            .then((data:ActionResult)=>{//si on trouve
                
                //on instanci le bon type de service en fonction de son champ `type`
                let transportService:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
                transportService.hydrate(data.result[0]);//on l'hydrate avec les données recupéré de la bd

                //liste des transactions
                let transactionList:Record<string, any>[]= data.result[0].transactions;
                
                //on recherche la transaction courante
                let transactionIndex= transactionList.findIndex((transact:Record<string, any>)=>transact.id==idTransaction);
                
                if(transactionIndex<0) //si on ne la retrouve pas (id de la transaction pas trouvé en bd) on rejete la promesse
                {
                    data.result=null;
                    data.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    data.message=`Transaction with id ${idTransaction} not found`;
                    return Promise.reject(data);
                }

                //on recupere la liste des transactions
                let transaction:TransactionService=new TransactionService(transactionList[transactionIndex].id,transportService);
                //on essaie car les methodes de l'objet de transaction lance des exceptions celon des cas
                try{
                    //on accepte le pix
                    transaction.acceptPrice(price);
                    //on met a jour le tableau des transactions
                    transactionList.splice(transactionIndex,1);
                    transactionList.push(transaction.toString());

                    //on repercute la transaction en bd
                    return this.db.updateInCollection(
                        Configuration.collections.requestservice,
                        {"_id":idTransportService},
                        {"transactions":transactionList,"idSelectedTransaction":idTransaction,"idSelectedProvider":idProvider},{});
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
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>reject(error));
        });
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
                    
                    let transaction=new TransactionService(idTransaction,service)
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

    /**
     * @description Permet au demandeur de service d'effectué le paiement sur la plateforme
     * @param idService Identifiant du service
     * @param idTransaction Identifiant de la transaction
     */
    makePaiement(idService:String,idTransaction:String):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let transaction:TransactionService;
            let transactionIndex:number;
            let transactionList:Record<string, any>[];
            //on recupere le service en fonction de son identifiant
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":idService},1)
            .then((data:ActionResult)=>{ 
                if( data.result[0].idSelectedTransaction==undefined || 
                    data.result[0].idSelectedTransaction==""
                )
                {
                    //si le service ne permet pas encore de faire le paiement (l'étape n'est pas 
                    //le bon ) on rejete la promesse avec le message d'érreur associer
                    data.result=null;
                    data.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    data.message="Impossible de faire le paiement a cette étape";
                    return Promise.reject(data);
                }
                else
                {
                    
                    //si on peut faire le paiemement

                    // on instanci le service en fonction de son champ `type`
                    let service:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
                    service.hydrate(data.result[0]);//on l'hydrade avec les données de la bd

                    //on recupere la transaction en fonction de son id et on l'hydrate
                    transaction=new TransactionService(new EntityID(),service)
                    transactionList= data.result[0].transactions;
                
                    let transactionObj= transactionList.find((transact:Record<string, any>)=>transact.id==idTransaction);
                    transaction.hydrate(transactionObj);

                    //on fait le paiement
                    return transaction.makePaiement()
                }
            })
            .then((data:ActionResult)=>{
                //on met a jour le tableau des transactions et on repercute la modification en bd
                transactionList.splice(transactionIndex,1);
                    transactionList.push(transaction.toString());
                    return this.db.updateInCollection(
                        Configuration.collections.requestservice,
                        {"_id":idService},
                        {"transactions":transactionList},{});
                
            })
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>{
                reject(error);
            })
        });
    }

    /**
     * 
     * @param idService identifiant du service
     * @param idTransaction identifiant de la transaction
     */
    endTransaction(idService:String,idTransaction:String):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            //on recupere le service en fonction de son identifiant
            this.db.findInCollection(Configuration.collections.requestservice,{"_id":idService},1)
            .then((data:ActionResult)=>{ 
                if( data.result[0].idSelectedTransaction==undefined || 
                    data.result[0].idSelectedTransaction==""
                )
                {
                    //si on est pas encore a l'étape permettant de finalisé le service
                    data.result=null;
                    data.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    data.message="Impossible de finalisé le service a cette étape";
                    return Promise.reject(data);
                }
                else
                {                    
                    //on recupere le service en fonction de son identifiant 
                    let service:TransportServiceType=ServiceTypeFactory.getInstance(data.result[0].type);
                    service.hydrate(data.result[0]);//on l'hydrate avec les données de la bd
                    let transactionList= data.result[0].transactions;
                    
                    //on recupere la transaction en fonction de son id et on l'hydrate
                    let transactionObj= transactionList.find((transact:Record<string, any>)=>transact.id==idTransaction);
                    
                    let transaction:TransactionService=new TransactionService(new EntityID(),service);
                    transaction.hydrate(transactionObj);
                    transaction.endService();//on finalise le service

                    //on met a jour la bd
                    return this.db.updateInCollection(
                        Configuration.collections.requestservice,
                        {"_id":idService},
                        {"transactions":transactionList},{});
                
                }
            })
            .then((data:ActionResult)=>resolve(data))
            .catch((error:ActionResult)=>{
                reject(error);
            })
        });
    }
}