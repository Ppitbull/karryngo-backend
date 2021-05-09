/**
@author Cedric Nguendap
@description Cette classe represente la classe de transaction de service
@created 22/11/2020
*/

import { KarryngoException } from "../../../../karryngo_core/exception/KarryngoException";
import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { TransportService } from "./transportservice";
import { TransportServiceType } from "./transportservicetype";

export enum TransactionServiceState
{
    INIT,
    SERVICE_ACCEPTED_AND_WAITING_PAIEMENT,
    SERVICE_PAIEMENT_DONE_AND_WAITING_START,
    SERVICE_RUNNING,
    SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT,
    SERVICE_PROVIDER_PAIEMENT_DONE,
    SERVICE_END,
}

export class InvalideServiceStateException extends KarryngoException
{
    static TRANSACTION_IS_NOT_IN_INIT_STATE_ERROR:Number=-109;
    static INVALID_PRICE_IN_TRANSACTION_ERROR:Number=-108;
    static TRANSACTION_IS_NOT_IN_WAITING_PAIEMENT_STATE_ERROR:Number=-107;
    static TRANSACTION_IS_NOT_IN_RUNNIG_STATE_ERROR:Number=-106;
    static TRANSACTION_IS_NOT_IN_WAITING_START_STATE_ERROR:Number=-105
    static TRANSACTION_IS_NOT_IN_WAITING_PROVIDER_PAIEMENT_STATE_ERROR:Number=-104;
    static TRANSACTION_IS_NOT_IN_PROVIDER_PAIEMENT_DONE_STATE_ERROR:Number=-103;
    constructor(code:Number,description:String)
    {
        super(code,"Error in transaction: "+description,description);
    }
}

export class TransactionService extends KarryngoPersistentEntity
{
    state:TransactionServiceState;
    // service:TransportServiceType;
    idProvider:String="";
    idRequester:String="";
    price:String="";

    constructor(id:EntityID=new EntityID(),)
    {
        super(id);
        this.state=TransactionServiceState.INIT;
        // this.service=transportService;
    }

    /**
     * @description Permet d'accepter de prix par le fournisseurs de service. il permet a 
     *  la transaction de passé a un l'état Service accepter (voir diagramme d'état transition de 
     *  de gestion de service)
     * @param price Prix du service
     * @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander d'accepter le prix du service
     */
    acceptPrice(price:Number)
    {
        if(this.state!=TransactionServiceState.INIT) 
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_INIT_STATE_ERROR,"la transaction doit être dans son état initial")
        if(price<0)
            throw new InvalideServiceStateException(InvalideServiceStateException.INVALID_PRICE_IN_TRANSACTION_ERROR,"Le prix doit être supérieur a 0")
        this.price=`${price}`;
        this.state=TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT;
    }
    makePaiement()
    {
        if(this.state!=TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_PAIEMENT_STATE_ERROR,
                "Cannot make paiement in that step of transaction")
        }
            //on fait le paiemement. ici cela consite a retirer les fonds 
            //du compte bancaire|carte de crédit|compte paypal|... du client vers le compte bancaire de la plateforme
        this.state=TransactionServiceState.SERVICE_PAIEMENT_DONE_AND_WAITING_START;
    }


    startService()
    {
        if(this.state!=TransactionServiceState.SERVICE_PAIEMENT_DONE_AND_WAITING_START)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_START_STATE_ERROR,
                "Cannot start service in that step of transaction")
        }
        this.state=TransactionServiceState.SERVICE_RUNNING;
    }

    serviceDone()
    {
        if(this.state!=TransactionServiceState.SERVICE_RUNNING)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_RUNNIG_STATE_ERROR,
                "Cannot done service in that step of transaction")
        }
        this.state=TransactionServiceState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT;
    }

    makeProviderPaiement()
    {
        if(this.state!=TransactionServiceState.SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_PROVIDER_PAIEMENT_STATE_ERROR,
                "Cannot make a provider payement in that step of transaction")
        }
        //un evenement asynchrone seras emit pour faire le paiement
        //on fait le paiemement. ici cela consite a retirer les fonds 
        //du compte bancaire de la plateforme vers le compte  bancaire|carte de crédit|compte paypal|... du client
        this.state=TransactionServiceState.SERVICE_PROVIDER_PAIEMENT_DONE;
    }
     /**
     * @description Permet de terminer le service. a cette étape le demandeur et le fournisseur de service
     *  valide que le service est terminer. 
     *  @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander la fin du service
     */
    endService()
    {
        let dataResult:ActionResult=new ActionResult();
        if(this.state!=TransactionServiceState.SERVICE_PROVIDER_PAIEMENT_DONE)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_PROVIDER_PAIEMENT_DONE_STATE_ERROR,
                "Cannot end service in that step of transaction")
        }
        this.state=TransactionServiceState.SERVICE_END;
    }

    /**
     * 
     * @inheritdoc
     */
    hydrate(entity:any):void
    {
        super.hydrate(entity);
        this.state=this.purgeAttribute(entity,"state");
        this.idProvider=this.purgeAttribute(entity,"idProvider");
        this.idRequester=this.purgeAttribute(entity,"idRequester");
        this.price=this.purgeAttribute(entity,"price");
    }

    /**
     * 
     * @inheritdoc
     */
    toString()
    {
        return {
            ...super.toString(),
            state:this.state,
            idProvider:this.idProvider,
            idRequester:this.idRequester,
            price:this.price,
        }
    }
}