"use strict";
/**
@author: Cedric nguendap
@description: Cette classe permet represente un utilisateur du systéme
@created 09/10/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const Address_1 = require("./Address");
class User extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(_id = new EntityID_1.EntityID(), fname = "", lname = "", username = "", pwd = "", add = new Address_1.Address()) {
        super(_id);
        /**
         * @description nom de l'utilisateur
         * @type String
         */
        this.firstname = "";
        /**
         * @description prenom de l'utilisateur
         * @type String
         */
        this.lastname = "";
        /**
         * @description mot de passe de l'utilisateur
         * @type String
         */
        this.password = "";
        this.username = "";
        this.firstname = fname;
        this.lastname = lname;
        this.password = pwd;
        this.adresse = add;
        this.username = username;
    }
    /**
     * @inheritdoc
     */
    toString() {
        // console.log("Adress",this.adresse.toString())
        return Object.assign(Object.assign({}, super.toString()), { "firstname": this.firstname, "lastname": this.lastname, "password": this.password, "username": this.username, "address": this.adresse.toString() });
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        //console.log("entite ",entity)
        super.hydrate(entity);
        this.firstname = this.purgeAttribute(entity, "firstname");
        this.lastname = this.purgeAttribute(entity, "lastname");
        this.password = this.purgeAttribute(entity, "password");
        if (entity.address)
            this.adresse.hydrate(entity.address);
        this.username = this.purgeAttribute(entity, "username");
    }
}
exports.User = User;
