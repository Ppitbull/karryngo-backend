"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoPersistentEntity = void 0;
const KarryngoEntity_1 = require("../KarryngoEntity");
const EntityID_1 = require("../utils/EntityID");
class KarryngoPersistentEntity extends KarryngoEntity_1.KarryngoEntity {
    constructor(id = new EntityID_1.EntityID()) {
        super();
        this._id = id;
    }
    /**
     * @description Cette methode permet de verifier l'existance d'un valeur dans
     *  un objet JSON afin de retourner sa valeur. cela évite des erreurs du a la tentative
     *  d'accés a un attribue non contenu dans l'objet JSON
     * @param object objet au format JSON
     * @param attr attribue dont on veu la valeur
     * @return null si l'attribut n'exite pas et sa valeur dans le cas contraire
     */
    purgeAttribute(object, attr) {
        if (object == null || object == undefined)
            return null;
        if (object.hasOwnProperty(attr.toString()))
            return object[attr.toString()];
        if (this.hasOwnProperty(attr.toString()))
            return Reflect.get(this, attr.toString());
        return null;
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        //console.log("Entity ",entity._id)
        if (entity._id)
            this.id = this.purgeAttribute(entity, "_id");
    }
    /**
     * @inheritdoc
     */
    toString() {
        return {
            _id: this.id.toString()
        };
    }
    set id(_id) {
        this._id = _id;
    }
    get id() {
        return this._id;
    }
}
exports.KarryngoPersistentEntity = KarryngoPersistentEntity;
