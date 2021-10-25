"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBManager = void 0;
const ActionResult_1 = require("../utils/ActionResult");
const mongodb_1 = require("mongodb");
/**
@author: Cedric nguendap
@description: Cette classe permet de mettre en oeuvre l'unité de persistance basé
    sur mongoDB et utilisant mongoose comme ORM
@created: 23/09/2020
*/
const NoSqlPersistenceManager_1 = require("./NoSqlPersistenceManager");
const DataBaseException_1 = require("../exception/DataBaseException");
const constants_1 = __importDefault(require("../../config-files/constants"));
class MongoDBManager extends NoSqlPersistenceManager_1.NoSqlPersistenceManager {
    constructor() {
        super(...arguments);
        this.client = null;
    }
    updateInCollection(collectionName, cond, toUpdate, options = {
        returnOriginal: false,
        upsert: true
    }) {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            this.getCollection(collectionName).findOneAndUpdate(cond, toUpdate, options, (err, r) => {
                if (err) {
                    result.resultCode = DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR;
                    result.message = "Cannot update document in collection";
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
    findDepthInCollection(collectionName, options) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result = new ActionResult_1.ActionResult();
            try {
                let arr = [];
                let cursor = this.getCollection(collectionName).aggregate(options);
                while (yield cursor.hasNext())
                    arr.push(yield cursor.next());
                result.result = [...arr];
                resolve(result);
            }
            catch (e) {
                result.resultCode = DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR;
                result.message = "Cannot find document";
                result.result = e;
                reject(result);
            }
        }));
    }
    findInCollection(collectionName, options, othersOption = {}, limit = MongoDBManager.MAX_TO_FIND) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result = new ActionResult_1.ActionResult();
            try {
                let arr = [];
                let cursor = this.getCollection(collectionName).find(options).project(othersOption).limit(MongoDBManager.MAX_TO_FIND);
                while (yield cursor.hasNext())
                    arr.push(yield cursor.next());
                result.result = [...arr];
                resolve(result);
            }
            catch (e) {
                result.resultCode = DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR;
                result.message = "Cannot find document";
                result.result = e;
                reject(result);
            }
        }));
    }
    addToCollection(collectionName, entity) {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            this.getCollection(collectionName)
                .insertOne(entity.toString(), (err, res) => {
                if (err != undefined && err != null) {
                    result.resultCode = DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR;
                    result.message = "Unable to insert data  in " + collectionName;
                    result.result = err;
                    reject(result);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    removeToCollection(collectionName, entity) {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    createCollection(collectionName) {
        return new Promise((resolve, reject) => {
        });
    }
    /**
     * @inheritdoc
     */
    deleteCollection(collectionName) {
        return new Promise((resolve, reject) => {
            let delResult = new ActionResult_1.ActionResult();
            this.getCollection(collectionName)
                .remove({}, (err, r) => {
                if (err) {
                    delResult.resultCode = DataBaseException_1.DataBaseException.DATABASE_UNKNOW_ERROR;
                    delResult.message = "Cannot delete collection: " + collectionName;
                    delResult.result = err;
                    reject(delResult);
                }
                else {
                    delResult.result = r;
                    resolve(delResult);
                }
            });
        });
    }
    /**
     * @inheritdoc
     */
    getCollection(collectionName) {
        return this.db.collection(collectionName);
    }
    /**
     * @inheritdoc
     */
    disconnect() {
        this.db.close();
    }
    /**
     * @inheritdoc
     */
    getQueryBuilder(entity) {
        return this.getCollection(entity.constructor.name.toLowerCase());
    }
    static connexionStringBuilder(configUrl) {
        let connexionString = configUrl.server_prefix + '://';
        if (configUrl.username && configUrl.password)
            connexionString += `${configUrl.username}:${configUrl.password}@`;
        connexionString += `${configUrl.hostname}/${configUrl.database}`;
        if (configUrl.params)
            connexionString += `${configUrl.params}`;
        return connexionString;
    }
    /**
     * @description Cette message permet de faire une connexion a une bd MongoDB
     * @param configUrl parametre permetant de constitué l'url de connexion
     */
    static connect(configUrl) {
        let result = new ActionResult_1.ActionResult();
        let connexionString = MongoDBManager.connexionStringBuilder(configUrl).toString();
        // let connexionString=`mongodb+srv://admin:KFBbc7ebBHHloYyd@cluster0.kiwom.mongodb.net/karryngo?retryWrites=true&w=majority`
        return new Promise((resolve, reject) => {
            let mongoClient = new mongodb_1.MongoClient(connexionString, { useNewUrlParser: true, useUnifiedTopology: true });
            //connexion a la bd
            mongoClient.connect((err) => {
                if (err) {
                    //si une erreur est rencontré on rejete la promise
                    result.resultCode = DataBaseException_1.DataBaseException.DATABAE_DISCONNECTED;
                    result.message = "Erreur lors de la connexion a la bd";
                    result.result = err;
                    reject(result);
                }
                else {
                    //si la connexion s'ouvre alors on resoud la promise
                    result.result = mongoClient.db(configUrl.database.toString());
                    //mongoClient.close();
                    resolve(result);
                }
            });
        });
    }
    /**
     * @inheritdoc
     */
    connect() {
        //creation de l'url de connexion a la bd a partir des informations du service de configuration        
        return new Promise((resolve, reject) => {
            // MongoDBManager.connect(this.configService.getValueOf('persistence'))
            MongoDBManager.connect(this.configService.getValueOf('persistence')[constants_1.default.env_mode].database_data)
                .then((data) => {
                this.db = data.result;
                data.result = null;
                resolve(data);
            })
                .catch((error) => reject(error));
        });
    }
    /**
     * @inheritdoc
     */
    create(entity) {
        return this.addToCollection(entity.constructor.name, entity);
    }
    /**
     * @inheritdoc
     */
    update(entity) {
        throw new Error("Method update() not implemented.");
    }
    /**
     * @inheritdoc
     */
    delete(entity) {
        throw new Error("Method delete() not implemented.");
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method toString() not implemented.");
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        throw new Error("Method hydrate() not implemented.");
    }
}
exports.MongoDBManager = MongoDBManager;
MongoDBManager.MAX_TO_FIND = 20;
