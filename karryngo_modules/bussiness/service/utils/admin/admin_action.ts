import { UserManagerService } from './../../../../services/usermanager/usermanager.service';
import { Request, Response } from "express";
import Configuration from "../../../../../config-files/constants";
import { Controller, DBPersistence } from "../../../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../../../karryngo_core/utils/ActionResult";
import { User } from '../../../../services/usermanager/entities/User';
import { EntityID } from '../../../../../karryngo_core/utils/EntityID';

@Controller()
export class AdminAction {
    @DBPersistence()
    db: PersistenceManager;

    constructor(
        private userManagerService: UserManagerService,
    ) { }

    acceptAsProvider(request: any, response: Response) {
        let accountType = ""

        let id: EntityID = new EntityID();
        id.setId(request.decoded.id)
        this.userManagerService.findUserById(id)
            .then((data: ActionResult) => {
                accountType = data.result[0].accountType

                if (accountType == "Admin") {
                    let email = request.body.email;

                    this.userManagerService.findUserByEmail(email)
                        .then(() => {
                            return this.db.updateInCollection(Configuration.collections.user,
                                { "address.email": email },
                                {
                                    $set: { "isProvider": true, "isAcceptedProvider": true }
                                })
                        })
                        .then((result: ActionResult) => {
                            response.status(200).json({
                                resultCode: result.resultCode,
                                message: "The user was updated successfully"
                            });
                        })
                        .catch((error: ActionResult) => {
                            response.status(500).json({
                                resultCode: error.resultCode,
                                message: "Une erreur est survenue"
                            })
                        });
                }
                else return response.status(401).json({
                    resultCode: -1,
                    message: "Vous ne pouvez pas effectuer cette operation"
                })
            }).catch((error: ActionResult) => {
                return response.status(404).json({
                    resultCode: error.resultCode,
                    message: error.message
                })
            })
    }

    removeAsProvider(request: any, response: Response) {
        let accountType = ""

        let id: EntityID = new EntityID();
        id.setId(request.decoded.id)
        this.userManagerService.findUserById(id)
            .then((data: ActionResult) => {
                accountType = data.result[0].accountType

                if (accountType == "Admin") {
                    let email = request.body.email;

                    this.userManagerService.findUserByEmail(email)
                        .then(() => {
                            return this.db.updateInCollection(Configuration.collections.user,
                                { "address.email": email },
                                {
                                    $set: { "isProvider": false, "isAcceptedProvider": false }
                                })
                        })
                        .then((result: ActionResult) => {
                            response.status(200).json({
                                resultCode: result.resultCode,
                                message: "The user was updated successfully"
                            });
                        })
                        .catch((error: ActionResult) => {
                            response.status(500).json({
                                resultCode: error.resultCode,
                                message: "Une erreur est survenue"
                            })
                        });
                }
                else return response.status(401).json({
                    resultCode: -1,
                    message: "Vous ne pouvez pas effectuer cette operation"
                })
            }).catch((error: ActionResult) => {
                return response.status(404).json({
                    resultCode: error.resultCode,
                    message: error.message
                })
            })
    }
}