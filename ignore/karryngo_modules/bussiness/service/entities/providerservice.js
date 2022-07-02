"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const location_1 = require("./../../../services/geolocalisation/entities/location");
const vehicle_1 = require("./vehicle");
const Address_1 = require("../../../services/usermanager/entities/Address");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
class ProviderService extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.title = "";
        this.name = "Provider Name";
        this.description = "";
        this.idProvider = new EntityID_1.EntityID();
        this.deservedZone = [];
        this.listVehicle = [];
        this.documents = [];
        this.addressForVerification = [];
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { title: this.title, name: this.name, description: this.description, providerId: this.idProvider.toString(), zones: this.deservedZone.map((zone) => zone.toString()), vehicles: this.listVehicle.map((vehicle) => vehicle.toString()), documents: this.documents, addressForVerification: this.addressForVerification.map((add) => add.toString()) });
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "providerId")
                this.idProvider.setId(entity[key]);
            else if (key == "zones")
                this.deservedZone = entity[key].map((zone) => {
                    let local = new location_1.Location();
                    local.hydrate(zone);
                    return local;
                });
            else if (key == "vehicles")
                this.listVehicle = entity[key].map((vehicle) => {
                    let v = new vehicle_1.Vehicle();
                    v.hydrate(vehicle);
                    return v;
                });
            else if (key == "addressForVerification")
                this.addressForVerification = entity[key].map((add) => {
                    let addr = new Address_1.Address();
                    addr.hydrate(add);
                    return addr;
                });
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
}
exports.ProviderService = ProviderService;
