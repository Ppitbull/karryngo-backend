"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseDBManager = void 0;
var ActionResult_1 = require("../utils/ActionResult");
var mongoose_1 = __importDefault(require("mongoose"));
var NoSqlPersistenceManager_1 = require("./NoSqlPersistenceManager");
var DataBaseException_1 = require("../exception/DataBaseException");
var MongooseDBManager = /** @class */ (function (_super) {
    __extends(MongooseDBManager, _super);
    function MongooseDBManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = {
            database: {
                useNewUrlParser: true
            },
            schema: {
                strict: false
            }
        };
        return _this;
    }
    /**
     *
     * @inheritdoc
     *
     */
    MongooseDBManager.prototype.getQueryBuilder = function (entity) {
        return this.createShema(entity);
    };
    /**
     * @inheritdoc
     */
    MongooseDBManager.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            //creation de l'url de connexion a la bd a partir des informations du service de configuration
            var connexionString = "mongodb://" + _this.configService.getValueOf("persistence").hostname + ":" + _this.configService.getValueOf("persistence").port + "/" + _this.configService.getValueOf("persistence").database;
            var result = new ActionResult_1.ActionResult();
            //connexion a la bd
            mongoose_1.default.connect(connexionString.toString(), _this.options.database);
            _this.db = mongoose_1.default.connection;
            _this.db.on('error', function (e) {
                //si une erreur est rencontré on rejete la promise
                result.resultCode = DataBaseException_1.DataBaseException.DATABAE_DISCONNECTED;
                result.message = "Erreur lors de la connexion a la bd";
                result.description = e;
                reject(result);
            });
            //si la connexion s'ouvre alors on resoud la promise
            _this.db.on('open', function () { return resolve(result); });
        });
    };
    /**
     *
     * @inheritdoc
     */
    MongooseDBManager.prototype.create = function (entity) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var result = new ActionResult_1.ActionResult();
            _this.createShema(entity).create(entity).then(function (data) {
                result.result = data;
                resolve(result);
            })
                .catch(function (e) {
                result.result = e;
                result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                reject(e);
            });
        });
    };
    /**
     * @inheritdoc
     */
    MongooseDBManager.prototype.update = function (entity) {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongooseDBManager.prototype.delete = function (entity) {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongooseDBManager.prototype.toString = function () {
        throw new Error("Method not implemented.");
    };
    /**
     * @inheritdoc
     */
    MongooseDBManager.prototype.hydrate = function (entity) {
        throw new Error("Method not implemented.");
    };
    /**
     * @description Cette methode permet de creer le model d'une entité persistante
     *  cette méthode évite d'écrire manuellement les schémas et model néccéssaires a mongoose pour l'interaction
     *  avec la bd et ajoute ainsi une couche d'abstraction pour l'accés a la bd
     * @param entity entité dont on veut créer le schéma
     * @return retourne le schéam creer a partir de la classe obtenu en se servant de l'api de reflextion
     *  offerte par TypeScript
     */
    MongooseDBManager.prototype.createShema = function (entity) {
        var schema = mongoose_1.default.Schema;
        //création d'un schema vide
        var entitySchema = new mongoose_1.default.Schema({}, this.options.schema);
        //construction du schéma a partir de la classe
        entitySchema.loadClass(entity.constructor);
        //création du model a partir du schema générer
        return mongoose_1.default.model(entity.constructor.name, entitySchema);
    };
    return MongooseDBManager;
}(NoSqlPersistenceManager_1.NoSqlPersistenceManager));
exports.MongooseDBManager = MongooseDBManager;
