/**
@author Cedric Nguendap
@description Cette classe represente la classe de transaction de service
@created 22/11/2020
*/

import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
import { EntityID } from "../../../../karryngo_core/utils/EntityID";
import { TransportService } from "./transportservice";

export class TransactionServiceState
{
    static INIT:Number=0;
}


export class TransactionService extends KarryngoPersistentEntity
{
    state:Number;
    service:TransportService;

    constructor(id:EntityID,transportService:TransportService)
    {
        super(id);
        this.state=TransactionServiceState.INIT;
        this.service=transportService;
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
    }

    /**
     * @description Permet de rejecter de prix du demandeur de service. il permet a 
     *  la transaction de revenir a l'état Service en discution (voir diagramme d'état transition de 
     *  de gestion de service)
     * @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander de rejecter le prix du service
     */
    rejectPrice()
    {

    }

    /**
     * @description Permet de débuter la transaction. cette méthode est appeler une fois le service 
     *  enregistrer et les fournisseurs de service trouvé. a cette étape l'un des membres de la discution
     *  fournisseurs ou demandeur de service veut démarer la discution (voir diagramme d'état transition de 
     *  de gestion de service)
     * @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander d'initialiser le service
     */
    beginService()
    {

    }

    /**
     * @description Permet d'initier le paiement. a cette étape le demandeur de service doit valider le 
     *  paiement
     *  @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander d'initialiser le paiement
     */
    initPaiement()
    {

    }

     /**
     * @description Permet de rejecter le paiement. a cette étape le demandeur de service annule le paiement
     *  @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander d'annuler le paiement
     */
    rejectPaiement()
    {
        
    }

     /**
     * @description Permet de terminer le service. a cette étape le demandeur et le fournisseur de service
     *  valide que le service est terminer. une note (nombre d'étoile) doit être retourner par le 
     *  demandeur de service sur la qualité du service rendu
     *  @throws new InvalideServiceStateException() si cette méthode n'est pas appeler a une étape 
     *  ou l'on doit demander la fin du service
     */
    endService()
    {

    }
}