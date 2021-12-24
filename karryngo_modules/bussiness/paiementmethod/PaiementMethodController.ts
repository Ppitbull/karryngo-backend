/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des 
    fournisseur de service
@created 13/10/2020
*/

import { Request,Response } from "express";
import { Controller } from "../../../karryngo_core/decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { paiementMethodBuilder } from "../../services/toupesu/entities/paiementmethodbuilder";
import { PaiementMethodEntity } from "../../services/toupesu/entities/paiementmethodentity";
import { PaiementStrategyType } from "../../services/toupesu/enums";
import { PaiementMethodService } from "../../services/toupesu/paiementmethod.service";



@Controller()
export class PaiementMethodController
{
    constructor (private paiementMethodService:PaiementMethodService) {}


    addPaiementMethod(request:any,response:Response)
    {
        let type:PaiementStrategyType=request.body.type;
        let number:String=request.body.number;
        let moneyCode:String=request.body.moneyCode;
        let userID:EntityID=new EntityID();
        userID.setId(request.decoded.id)

        if(!type || !number || !moneyCode)
        {
            let errorMsg=""
            if(type) errorMsg="Argument type not found";
            if(number) errorMsg="Argument number not found";
            if(moneyCode) errorMsg="Argument moneyCode not found";
            return response.status(400).json({
                resultCode:ActionResult.INVALID_ARGUMENT,
                message:errorMsg
            })      
        }
        let paiementMethod:PaiementMethodEntity= paiementMethodBuilder(request.body);
        this.paiementMethodService.addMethodPaiement(userID,paiementMethod)
        .then((result:ActionResult)=>{
            response.status(201).json({
                resultCode:ActionResult.SUCCESS,
                message:"Payement method created successfully"
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }

    getPaiementList(request:any,response:Response):void
    {
        let userID:EntityID=new EntityID();
        userID.setId(request.decoded.id);
        this.paiementMethodService.getAllPaiementMethod(userID)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:'list of method payment',
                result:result.result
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message
            })
        })
    }
    
}