"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de base des services de transport
@created 22/11/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportService = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
class TransportService extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(id, name, startLocation, endLocation) {
        super(id);
        this.name = name;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        super.hydrate(entity);
        if (entity.hasOwnProperty('name'))
            this.name = entity.name;
        this.startLocation.hydrate(entity);
        this.endLocation.hydrate(entity);
    }
    /**
     * @inheritdoc
     */
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { name: this.name, startLocation: this.startLocation.toString(), endLocation: this.endLocation.toString() });
    }
}
exports.TransportService = TransportService;
