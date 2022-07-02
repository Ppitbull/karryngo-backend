"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente l'entité des messages
@created 19/01/2021
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const KarryngoPersistentEntity_1 = require("../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
class Message extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.from = new EntityID_1.EntityID();
        this.to = new EntityID_1.EntityID();
        this.date = "";
        this.title = "";
        this.content = "";
        this.read = 0; /** O: pour non lue et 1 pour lu */
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { from: this.from.toString(), to: this.to.toObject(), date: this.date, title: this.title, content: this.content, read: this.read });
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "from")
                this.from.setId(entity[key]);
            else if (key == "to")
                this.to.setId(entity[key]);
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
}
exports.Message = Message;
