"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KFile = void 0;
const KarryngoPersistentEntity_1 = require("../persistence/KarryngoPersistentEntity");
;
class KFile extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.name = "";
        this.lastModified = "";
        this.size = 0.0;
        this.type = "";
        this.data = Buffer.from([]);
        this.encoding = "base64";
    }
    hydrate(entity) {
        for (const key of Object.keys(entity)) {
            if (key == "data")
                this.data = Buffer.from(entity[key], this.encoding);
            if (Reflect.has(this, key))
                Reflect.set(this, key, entity[key]);
        }
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { name: this.name, lastModified: this.lastModified, size: this.size, type: this.type, data: this.data });
    }
}
exports.KFile = KFile;
