import { Request, Response } from "express";
import Configuration from "../../../../config-files/constants";
import { Controller, DBPersistence } from "../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";

@Controller()
export class RapportContry
{

    @DBPersistence()
    db:PersistenceManager;

    getPlatformCountyList(request:Request,response:Response)
    {
        this.db.findInCollection(
            Configuration.collections.user,
            {},
            {
                "address.country":1
            }
        )
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"List of countries",
                result:[...new Set(result.result.map((country)=>country.address.country))]
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
