"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonePaiementMethodFactory = void 0;
const nonepaymentstrategi_1 = require("./nonepaymentstrategi");
class NonePaiementMethodFactory {
    getMethodPaiment(method) {
        return new nonepaymentstrategi_1.NonePaiementMethodStrategi();
    }
}
exports.NonePaiementMethodFactory = NonePaiementMethodFactory;
