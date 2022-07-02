"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KResponse = void 0;
const core_decorator_1 = require("../../decorator/core.decorator");
const KarryngoApplicationEntity_1 = require("../../KarryngoApplicationEntity");
let KResponse = class KResponse extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor() {
        super(...arguments);
        this._header = {};
        this._status = 200;
        this._statusText = 'OK';
        this._config = {};
        this._data = {};
        this._request = {};
    }
    header(key, value) {
        this._header[key] = value;
        return this;
    }
    headers(headers = {}) {
        this._header = Object.assign(Object.assign({}, this._header), headers);
        return this;
    }
    data(data) {
        this._data = data;
        return this;
    }
    status(status) {
        this._status = status;
        return this;
    }
    statusText(statusText) {
        this._statusText = statusText;
        return this;
    }
    config(conf = {}) {
        this._config = conf;
        return this;
    }
    toString() {
        return {
            config: this._config,
            header: this._header,
            status: this._status,
            data: this._data
        };
    }
    hydrate(entity) {
    }
    getData() {
        return this._data;
    }
};
KResponse = __decorate([
    (0, core_decorator_1.KarryngoCore)()
], KResponse);
exports.KResponse = KResponse;
