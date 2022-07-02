"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rate = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
class Rate extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    // constructor(data) {  // Constructor
    //     super();
    //     this.id = data._id;
    //     this.owner = data.owner;
    //     this.manager = data.manager;
    //     this.provider = data.provider;
    //     this.countryID = data.countryID;
    // }
    // toString():Record<string,any>
    // {
    //     return {
    //         ...super.toString(),
    //         amount:this.amount
    //     }
    // }
    setOwner(rate) {
        if (rate < 0)
            return false;
        this.owner = rate;
        return true;
    }
    setManager(rate) {
        if (rate < 0)
            return false;
        this.manager = rate;
        return true;
    }
    setProvider(rate) {
        if (rate < 0)
            return false;
        this.provider = rate;
        return true;
    }
    getOwner() {
        return this.owner;
    }
    getProvider(rate) {
        return this.provider;
    }
    getManager(rate) {
        return this.manager;
    }
    setAll(data) {
        this.owner = data.owner;
        this.manager = data.manager;
        this.provider = data.provider;
        this.countryID = data.countryID;
    }
    setID(id) {
        this._id = id.toString();
    }
    getID() {
        return this._id.toString();
    }
}
exports.Rate = Rate;
