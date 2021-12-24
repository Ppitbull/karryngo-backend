"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
/**
@author: Cedric Nguendap
@description: Cette classe permet represente une zone de géolocalisation
@created: 10/10/2020
*/
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
class Location extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(id = new EntityID_1.EntityID(), name = "", longitude = 0.0, latitude = 0.0, country = "", city = "") {
        super(id);
        /**
         * @description represente le nom de la localisaton
         * @type String
         */
        this.name = "";
        /**
         * @description represente la latitude de la zone
         * @type Number (Double)
         */
        this.latitude = 0.0;
        /**
         * @description represente la longitude de la zone
         * @type Number (Double)
         */
        this.longitude = 0.0;
        this.country = "";
        this.city = "";
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.country = country;
        this.city = city;
    }
    /**
     * @inheritdoc
     */
    toString() {
        return {
            ...super.toString(),
            "long": this.longitude,
            "lat": this.latitude,
            "name": this.name,
            "country": this.country,
            "city": this.city
        };
    }
    hydrate(entity) {
        super.hydrate(entity);
        this.longitude = this.purgeAttribute(entity, "long");
        this.latitude = this.purgeAttribute(entity, "lat");
        this.name = this.purgeAttribute(entity, "name");
        this.country = this.purgeAttribute(entity, "country");
        this.city = this.purgeAttribute(entity, "city");
    }
}
exports.Location = Location;
//# sourceMappingURL=location.js.map