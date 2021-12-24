import { UserManagerService } from './../../../../services/usermanager/usermanager.service';
import { Request, Response } from "express";
import Configuration from "../../../../../config-files/constants";
import { Controller, DBPersistence } from "../../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../../karryngo_core/utils/ActionResult";
import { User } from '../../../../services/usermanager/entities/User';

@Controller()
export class AdminAction
{
    @DBPersistence()
    db:PersistenceManager;

    constructor(
        private userManagerService:UserManagerService,
    ){}

    acceptAsProvider(request : any, response : Response)
    {
        // verifier que l'utilisateur actuel est bien admin

        let email = request.body.email;

        this.userManagerService.findUserByEmail(email)
        .then(() => {
            return this.db.updateInCollection(Configuration.collections.user,
                {"address.email":email},
                {
                    $set:{"isProvider":true}
                })
        })
        .then((result:ActionResult) => {
            response.status(200).json({
                resultCode:result.resultCode,
                message:"The user was updated successfully"
            });
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:"Une erreur est survenue"
            })
        });
    }
}