/**
@author: Cedric nguendap
@description: Exception lié a la configuration de l'application
@see KarryngoException
@created: 22/09/2020
*/

import { KarryngoException } from "../../../../karryngo_core/exception/KarryngoException";

export class PaymentException extends KarryngoException
{
    static UNSUPPORTED_MOBILE_PAYMENT_METHOD:Number=-150;
    static UNSUPPORTED_BANK_PAYMENT_METHOD: Number=-151;
    
    constructor(code:Number,description:String)
    {
        super(code,"Payment "+description,description);
    }
}