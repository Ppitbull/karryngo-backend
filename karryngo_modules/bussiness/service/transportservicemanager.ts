/**
@author Cedric Nguendap
@description Cette classe represente la classe de gestion des transaction (cycle de vie des transaction)
@created 22/11/2020
*/

import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { TransportService } from "./entities/transportservice";
import { Location } from "./../../services/geolocalisation/entities/location";
import { TransactionService } from "./entities/transactionservice";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
export class TransportServiceManager
{
    create(service:TransportService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    findProvider(service:TransportService,location:Location):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    beginService(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    acceptServicePrice(transaction:TransactionService,price:Number):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    startTransaction(service:TransportService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    rejectServicePrice(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        })
    }

    makePaiement(transaction:TransportService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    rejectPaiement(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    endTransaction(transaction:TransactionService):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }

    findTransactionById(id:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

        });
    }
}