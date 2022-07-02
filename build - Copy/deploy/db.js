"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployDataBase = void 0;
const ActionResult_1 = require("../karryngo_core/utils/ActionResult");
class DeployDataBase {
    constructor(persistanceManagerFactory) {
        this.db = null;
        this.persistanceManager = persistanceManagerFactory.getInstance();
    }
    createDataBase(dbname) {
    }
    dropDataBase() {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            this.db.dropDataBase((err, r) => {
                if (err) {
                    result.message = "Cannot drop database";
                    result.result = err;
                    reject(result);
                }
                else {
                    result.result = r;
                    resolve(result);
                }
            });
        });
    }
}
exports.DeployDataBase = DeployDataBase;
