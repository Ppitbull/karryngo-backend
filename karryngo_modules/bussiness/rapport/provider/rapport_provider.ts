import { Request, Response } from "express";
import Configuration from "../../../../config-files/constants";
import { Controller, DBPersistence } from "../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../karryngo_core/utils/ActionResult";

@Controller()
export class RapportProvider
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(){}

    getProviderListByParams(request:Request,response:Response)
    {
        let country=request.params.country || "all";
        let type=request.params.type || "all";
        let status=request.params.status || "all";

        let findQuery={"isProvider":true};

        if(country!="all") findQuery["address.country"]=new RegExp(country,"i");
        switch(type)
        {
            case "personnal":
                findQuery["isCompany"]=false;
                break;
            case "company":
                findQuery["isCompany"]=true;
                break;
        }
        switch(status)
        {
            case "accepted":
                findQuery["isAcceptedProvider"]=true;
                break;
            case "waiting":
                findQuery["isAcceptedProvider"]=false;
        }
        //console.log(findQuery)
        this.db.findInCollection(
            Configuration.collections.user,
            findQuery)
        .then((result:ActionResult)=>{
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"List of service providers",
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