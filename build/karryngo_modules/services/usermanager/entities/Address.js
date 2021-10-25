"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
/**
@author: Cedric nguendap
@description: Cette classe permet de stocké toutes les addesses de l'utilisateur (Whatsapp,Tel,Email...)
@created: 09/10/2020
*/
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
class Address extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    /**
     * @constructor
     * @param id identifiant  de l'adresse
     */
    constructor(id = new EntityID_1.EntityID()) {
        super(id);
        this.email = "";
        this.mobilePhone = "";
        this.phone = "";
        this.websiteLink = "";
        this.whatsAppNumber = "";
        this.skypeNumber = "";
        this.zip = "";
        this.country = "";
        this.city = "";
    }
    /**
     * @inheritdoc
     */
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { email: this.email, mobilePhone: this.mobilePhone, phone: this.phone, websiteLink: this.websiteLink, whatsAppNumber: this.whatsAppNumber, skypeNumber: this.skypeNumber, zip: this.zip, country: this.country, city: this.city });
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        super.hydrate(entity);
        this.email = this.purgeAttribute(entity, "email");
        this.mobilePhone = this.purgeAttribute(entity, "mobilePhone");
        this.phone = this.purgeAttribute(entity, "phone");
        this.websiteLink = this.purgeAttribute(entity, "websiteLink");
        this.whatsAppNumber = this.purgeAttribute(entity, "whatsAppNumber");
        this.skypeNumber = this.purgeAttribute(entity, "skypeNumber");
        this.zip = this.purgeAttribute(entity, "zip");
        this.country = this.purgeAttribute(entity, "country");
        this.city = this.purgeAttribute(entity, "city");
    }
}
exports.Address = Address;
