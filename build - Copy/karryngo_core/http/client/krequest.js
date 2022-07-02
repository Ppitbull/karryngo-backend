"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KRequest = void 0;
const core_decorator_1 = require("../../decorator/core.decorator");
const KarryngoApplicationEntity_1 = require("../../KarryngoApplicationEntity");
const https = require("https");
let KRequest = class KRequest extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor() {
        super(...arguments);
        this.headerData = {};
        this.requestType = "json";
        this.dataObj = null;
        this.accesstoken = null;
        this.link = "";
        this.method = 'get';
    }
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
    token(accesstoken) {
        this.accesstoken = accesstoken;
        return this;
    }
    get() {
        this.method = "get";
        return this;
    }
    post() {
        this.method = "post";
        return this;
    }
    put() {
        this.method = "put";
        return this;
    }
    delete() {
        this.method = "delete";
        return this;
    }
    header(key, value) {
        this.headerData[key] = value;
        return this;
    }
    data(data) {
        this.dataObj = data;
        return this;
    }
    url(link) {
        this.link = link;
        return this;
    }
    json() {
        this.headerData['Content-Type'] = "application/json";
        this.requestType = "json";
        return this;
    }
    form() {
        this.headerData['Content-Type'] = "Content-Type': 'multipart/form-data";
        this.requestType = "form-data";
        return this;
    }
    text() {
        this.requestType = "text";
        return this;
    }
    xml() {
        this.requestType = "xml";
        this.headerData['Content-Type'] = "Content-Type': 'application/xml";
        return this;
    }
    serializeDataToUrl() {
        let endpoint = this.link.toString();
        if (this.dataObj) {
            let req = '';
            for (const key in this.dataObj) {
                req += `${key}=${this.dataObj[key]}&`;
            }
            endpoint += "?" + req;
        }
        return endpoint;
    }
    toJSON() {
        return JSON.parse(JSON.stringify(this.dataObj));
    }
    toFormData() {
        let formData = new FormData();
        if (this.dataObj.constructor === ({}).constructor) {
            for (let key in this.dataObj) {
                formData.append(key, this.dataObj[key]);
            }
        }
        else if (this.dataObj.constructor === ([]).constructor) {
            for (let i = 0; i < this.dataObj.length; i++) {
                formData.append(i.toString(), this.dataObj[i]);
            }
        }
        else {
            formData.append("data", this.dataObj);
        }
        return formData;
    }
    toString() {
        let data;
        if (this.requestType == "form-data")
            data = this.toFormData();
        if (this.requestType == "json")
            data = this.toJSON();
        return {
            url: this.link.toString(),
            method: this.method,
            headers: this.headerData,
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            data,
        };
    }
};
KRequest = __decorate([
    (0, core_decorator_1.KarryngoCore)()
], KRequest);
exports.KRequest = KRequest;
