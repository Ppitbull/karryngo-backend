"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseDBManager = void 0;
const ActionResult_1 = require("../utils/ActionResult");
// import mongooseDB from 'mongoose';
let mongooseDB;
const NoSqlPersistenceManager_1 = require("./NoSqlPersistenceManager");
const DataBaseException_1 = require("../exception/DataBaseException");
class MongooseDBManager extends NoSqlPersistenceManager_1.NoSqlPersistenceManager {
    constructor() {
        super(...arguments);
        this.options = {
            database: {
                useNewUrlParser: true
            },
            schema: {
                strict: false
            }
        };
        this.shemas = new Map();
    }
    findDepthInCollection(collectionName, options) {
        throw new Error("Method not implemented.");
    }
    updateInCollection(collectionName, cond, toUpdate, options) {
        throw new Error("Method not implemented.");
    }
    createCollection(collectionName) {
        throw new Error("Method not implemented.");
    }
    deleteCollection(collectionName) {
        throw new Error("Method not implemented.");
    }
    getCollection(collectionName) {
        throw new Error("Method not implemented.");
    }
    addToCollection(collectionName, entity) {
        throw new Error("Method not implemented.");
    }
    removeToCollection(collectionName, entity) {
        throw new Error("Method not implemented.");
    }
    findInCollection(collectionName, options) {
        throw new Error("Method not implemented.");
    }
    disconnect() {
        throw new Error("Method not implemented.");
    }
    /**
     *
     * @inheritdoc
     *
     */
    getQueryBuilder(entity) {
        return this.createShema(entity);
    }
    /**
     * @inheritdoc
     */
    connect() {
        return new Promise((resolve, reject) => {
            //creation de l'url de connexion a la bd a partir des informations du service de configuration
            let connexionString = `mongodb://${this.configService.getValueOf("persistence").hostname}:${this.configService.getValueOf("persistence").port}/${this.configService.getValueOf("persistence").database}`;
            let result = new ActionResult_1.ActionResult();
            //connexion a la bd
            mongooseDB.connect(connexionString.toString(), this.options.database);
            this.db = mongooseDB.connection;
            this.db.on('error', (e) => {
                //si une erreur est rencontré on rejete la promise
                result.resultCode = DataBaseException_1.DataBaseException.DATABAE_DISCONNECTED;
                result.message = "Erreur lors de la connexion a la bd";
                result.description = e;
                reject(result);
            });
            //si la connexion s'ouvre alors on resoud la promise
            this.db.on('open', () => resolve(result));
        });
    }
    /**
     *
     * @inheritdoc
     */
    create(entity) {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            this.createShema(entity).create(entity).then((data) => {
                result.result = data;
                resolve(result);
            })
                .catch((e) => {
                result.result = e;
                result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                reject(e);
            });
        });
    }
    /**
     * @inheritdoc
     */
    update(entity) {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    delete(entity) {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    toString() {
        throw new Error("Method not implemented.");
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
    /**
     * @description Cette methode permet de creer le model d'une entité persistante
     *  cette méthode évite d'écrire manuellement les schémas et model néccéssaires a mongoose pour l'interaction
     *  avec la bd et ajoute ainsi une couche d'abstraction pour l'accés a la bd
     * @param entity entité dont on veut créer le schéma
     * @return retourne le schéam creer a partir de la classe obtenu en se servant de l'api de reflextion
     *  offerte par TypeScript
     */
    createShema(entity) {
        let schema = mongooseDB.Schema;
        //création d'un schema vide
        let entitySchema = new mongooseDB.Schema({}, this.options.schema);
        //construction du schéma a partir de la classe
        entitySchema.loadClass(entity.constructor);
        if (this.shemas.get(entity.constructor.name))
            return this.shemas.get(entity.constructor.name);
        //création du model a partir du schema générer
        let model = mongooseDB.model(entity.constructor.name, entitySchema);
        this.shemas.set(entity.constructor.name, model);
        return model;
    }
}
exports.MongooseDBManager = MongooseDBManager;
