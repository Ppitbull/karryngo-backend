"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente les vehicules de transports
@created 30/11/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
class Vehicle extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(id = new EntityID_1.EntityID()) {
        super(id);
        this.type = "";
        this.name = "";
        this.marque = "";
        this.photo = [];
        this.placeNumbler = 2;
        this.description = "";
    }
    /**
     * @inheritdoc
     */
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { type: this.type, name: this.name, marque: this.marque, photo: this.photo, placeNumbler: this.placeNumbler, description: this.description });
    }
}
exports.Vehicle = Vehicle;
Vehicle.CAR = "car";
Vehicle.AIRPLANE = "airplane";
Vehicle.BIKE = "bike";
