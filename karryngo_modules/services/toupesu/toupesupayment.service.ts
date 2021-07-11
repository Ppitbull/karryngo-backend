import { Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { PaiementMethod } from "./paiementmethod.interface";

@Service()
export class ToupesuPaiement
{
    constructor(){}
    
    makePaiement(toupesuPaiementMethod:PaiementMethod):Promise<ActionResult>
    {
        throw new Error("Method not implemented.");
    }
    checkPaiement(toupesuPaiementMethod:PaiementMethod):Promise<ActionResult>
    {
        throw new Error("Method not implemented.");
    }
    cancelPaiement(toupesuPaiementMethod:PaiementMethod):Promise<ActionResult>
    {
        throw new Error("Method not implemented.");
    }
}