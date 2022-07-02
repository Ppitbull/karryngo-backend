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
    INIT="init",
    SERVICE_ACCEPTED_AND_WAITING_PAIEMENT="service_accepted_and_waiting_paiement",
    SERVICE_PAIEMENT_DONE_AND_WAITING_START="service_paiement_done_and_waiting_start",
    SERVICE_RUNNING="service_running",
    SERVICE_DONE_AND_WAIT_PROVIDER_PAIEMENT="service_done_and_wait_provider_paiement",
    SERVICE_PROVIDER_PAIEMENT_DONE="service_provider_paiement_done",
    SERVICE_END="service_end",
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
    completed:Boolean=false;
    refID: String;

    constructor(id:EntityID=new EntityID(),)
    {
        super(id);
        this.state=TransactionServiceState.INIT;
        // this.service=transportService;
    }

    updatePrice(price:String)
    {
        let p : number=+price;
        if(p<0) throw new Error("price can't be negatve");
        this.price=`${p}`;
    }
    /**
     * @description Permet d'accepter de prix par le fournisseurs de service. il permet a 
     *  la transaction de passé a un l'état Service accepter (voir diagramme d'état transition de 
     *  de gestion de service)
     * @param price Prix du service
     * @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander d'accepter le prix du service
     */
    acceptPrice(price:String)
    {
        if(this.state!=TransactionServiceState.INIT) 
            return 1;
            // throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_INIT_STATE_ERROR,"la transaction doit être dans son état initial")
        
        let p=parseInt(price.toString());
        if(p<0)
            throw new InvalideServiceStateException(InvalideServiceStateException.INVALID_PRICE_IN_TRANSACTION_ERROR,"Le prix doit être supérieur a 0")
        this.price=price;
        this.state=TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT;
    }
    makePaiement(pay)
    {
        if(this.state!=TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT)
        {
            // throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_PAIEMENT_STATE_ERROR,
            //     "Cannot make paiement in that step of transaction")
        }



// This is the payment implemented by cedric. I changed it to the one bellow
/*        const https = require('https');
        const data = JSON.stringify(pay)

        const options = {
        hostname: 'whatever.com',
        port: 443,
        path: 'https://api.toupesu.com/livepaygateway2/api/main/reqPayment',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
            }
        }

        const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
            })
        })
        req.on('error', error => {
          console.error("error", error)
        })
*/


    const axios = require('axios');
    // console.log("pay : ", pay)
    var data;
    var makeRequest = async() => {
        let res = await axios.post('http://api.toupesu.com/livepaygateway2/api/main/reqPayment', pay).catch((err) => {
                        console.error(err);
                    });

        data = res.data;
        console.log("payment data : ", data);
    }
    makeRequest().then(() => {
        this.state=TransactionServiceState.SERVICE_PAIEMENT_DONE_AND_WAITING_START;
        // return result;
    });


        // const axios = require('axios');
        // var result;
        // const payment = async() => {
        //     result = await axios.post('http://api.toupesu.com/livepaygateway2/api/main/reqPayment', pay)
        //         .then((res) => {
        //             console.log(`Status: ${res.status}`);
        //             console.log('Body: ', res.data);
        //             result = res.data;
        //         }).catch((err) => {
        //             console.error(err);
        //             result = err;
        //         })
        // }
        
    }


    checkPaiement(pay): Promise<ActionResult>
    {
        if(this.state!=TransactionServiceState.SERVICE_ACCEPTED_AND_WAITING_PAIEMENT)
        {
            // throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_PAIEMENT_STATE_ERROR,
            //     "Cannot make paiement in that step of transaction")
        }
        return new Promise<ActionResult>((resolve,reject)=>{
            const axios = require('axios');
            // console.log("pay : ", pay)
            var makeRequest = async() => {
                let res = await axios.post('http://api.toupesu.com/livepaygateway2/api/main/checkTransation', pay).catch((err) => {
                                console.error(err);
                            });
                return res.data;
            }

            makeRequest().then((data) => {
                this.state=TransactionServiceState.SERVICE_PAIEMENT_DONE_AND_WAITING_START;
                // console.log("payment daaaaaaaaaaata : ", data);
                // return data;
                resolve(data) 
                // return result;
            });
        });
            
    }
 

    startService()
    {
        if(this.state!=TransactionServiceState.SERVICE_PAIEMENT_DONE_AND_WAITING_START)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_WAITING_START_STATE_ERROR,
                "Cannot start service in that step of transaction or This service may have already been started")
                // return {"status": 0, "state": this.state, "message": "This service has already been started. The status of this service should be service_paiement_done_and_waiting_start"}
        }
        this.state=TransactionServiceState.SERVICE_RUNNING;
    }

    serviceDone()
    {
        if(this.state!=TransactionServiceState.SERVICE_RUNNING)
        {
            throw new InvalideServiceStateException(InvalideServiceStateException.TRANSACTION_IS_NOT_IN_RUNNIG_STATE_ERROR,
                "Cannot end service in that step of transaction. This Service may have not been started or may have already been ended.")
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
    toString()
    {
        return {
            ...super.toString(),
            state:this.state,
            idProvider:this.idProvider,
            idRequester:this.idRequester,
            price:this.price,
            refID: this.refID,
        }
    }
}