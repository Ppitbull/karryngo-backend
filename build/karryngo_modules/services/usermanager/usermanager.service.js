"use strict";
/**
@author: Cedric nguendap
@description: Cette classe permet represente le service de gestion des utilisateurs
@created 13/10/2020
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagerService = void 0;
const constants_1 = __importDefault(require("../../../config-files/constants"));
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const customer_1 = require("../../bussiness/authentification/entities/customer");
const crud_service_1 = require("../crud/crud.service");
const User_1 = require("./entities/User");
const userfactory_1 = require("../../bussiness/authentification/entities/userfactory");
const decorator_1 = require("../../../karryngo_core/decorator");
let UserManagerService = class UserManagerService {
    constructor(crud) {
        this.crud = crud;
    }
    /**
     * @description Cette classe permet de creer un nouvel utilisateur
     * @param {User} user utilisateur que l'on veut creer
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré
     *  et elle est resolu si tout se passe bien
     */
    newUser(user) {
        return this.db.addToCollection("Users", user);
    }
    /**
     * @description Cette méthode permet de recherche un utilisateur a partir de son adresse email
     * @param {String} email Email de l'utilisateur dont on veu connaitre l'existance
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...) ou si aucun utilisateur ayant cette adresse email n'est trouvé et
     *  elle est résolu dans le cas contraire
     */
    findUserByEmail(email) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection("Users", { "address.email": email })
                .then((result) => {
                let people = result.result;
                let action = new ActionResult_1.ActionResult(); //si aucun utilisateur n'est trouvé on rejete la promise
                if (people.length == 0) {
                    action.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    action.message = "Error";
                    action.description = "User not found";
                    reject(action);
                }
                //sinon on resout la promise avec les différents comptes utilisateur trouvé
                else {
                    action.result = people.map((person) => {
                        let p = new User_1.User();
                        p.hydrate(person);
                        return p;
                    });
                    resolve(action);
                }
            }).catch((error) => reject(error));
        });
    }
    /**
     * @description Cette methode permet de rechercher un utilisateur a partir de son identifiant
     * @param {EntityID} id identifiant de l'utilisateur trouvé
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...) ou si aucun utilisateur ayant cette identifiant n'est trouvé et
     *  elle est résolu dans le cas contraire
     */
    findUserById(id) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.user, { "_id": id.toString() })
                .then((result) => {
                let action = new ActionResult_1.ActionResult();
                let people = result.result;
                if (people.length == 0) {
                    action.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    action.message = "User not found";
                    reject(action);
                }
                else {
                    action.result = people.map((person) => userfactory_1.UserFactory.getInstance(person));
                    resolve(action);
                }
            });
        });
    }
    /**
     * @description Cette methode permet de sauvegarder les informations d'un utilisateur. Elle
     *   est utiliser lorsque les informations de l'utilisateur déjà présent en base de données on
     *  subis une modification
     * @param {User} user utilisateur a sauvegarder
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...)  et
     *  elle est résolu dans le cas contraire
     */
    saveUser(idUser, toupdate) {
        return this.db.updateInCollection(constants_1.default.collections.user, { "_id": idUser.toString() }, { $set: toupdate }, {});
    }
    /**
     * @description Cette methode permet d'obtenir tous les utilisateurs présent en base de données
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...)  elle est résolu avec la liste des utilisateurs dans le cas contraire
     */
    findAll() {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.user, {}).
                then((result) => {
                let action = new ActionResult_1.ActionResult();
                action.result = result.result.map((person) => {
                    let p = new customer_1.Customer();
                    p.hydrate(person);
                    return p;
                });
                resolve(action);
            })
                .catch((error) => reject(error));
        });
    }
};
__decorate([
    decorator_1.DBPersistence(),
    __metadata("design:type", Object)
], UserManagerService.prototype, "db", void 0);
UserManagerService = __decorate([
    decorator_1.Service(),
    __metadata("design:paramtypes", [crud_service_1.CrudService])
], UserManagerService);
exports.UserManagerService = UserManagerService;
//# sourceMappingURL=usermanager.service.js.map