"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KError = void 0;
const core_decorator_1 = require("../../decorator/core.decorator");
const KarryngoApplicationEntity_1 = require("../../KarryngoApplicationEntity");
const krequest_1 = require("./krequest");
const kresponse_1 = require("./kresponse");
let KError = class KError extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor() {
        super(...arguments);
        this.request = new krequest_1.KRequest();
        this.response = new kresponse_1.KResponse();
        this.message = "";
    }
    toString() {
        return {};
    }
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
};
KError = __decorate([
    (0, core_decorator_1.KarryngoCore)()
], KError);
exports.KError = KError;
