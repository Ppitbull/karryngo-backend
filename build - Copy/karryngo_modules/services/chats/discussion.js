"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Discussion = void 0;
const KarryngoPersistentEntity_1 = require("../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const message_1 = require("./message");
class Discussion extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.inter1 = new EntityID_1.EntityID();
        this.inter2 = new EntityID_1.EntityID();
        this.idProject = new EntityID_1.EntityID();
        this.idTransaction = new EntityID_1.EntityID();
        this.chats = [];
        this.read = 0; /** O: pour non lue et 1 pour lu */
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { inter1: this.inter1.toString(), inter2: this.inter2.toString(), idTransaction: this.idTransaction.toString(), chats: this.chats.map((chat) => chat.toString()), idProject: this.idProject.toString(), read: this.read });
    }
    hydrate(entity) {
        // console.log("id ",this.id)
        for (const key of Object.keys(entity)) {
            if (key == "_id")
                this.id.setId(entity[key]);
            else if (key == "inter1")
                this.inter1.setId(entity[key]);
            else if (key == "inter2")
                this.inter2.setId(entity[key]);
            else if (key == "idProject")
                this.idProject.setId(entity[key]);
            else if (key == "chats")
                this.chats = entity[key].map((chat) => {
                    let disc = new message_1.Message(new EntityID_1.EntityID());
                    disc.hydrate(chat);
                    return disc;
                });
            else if (key == "idTransaction")
                this.idTransaction.setId(entity[key]);
            else if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
}
exports.Discussion = Discussion;
