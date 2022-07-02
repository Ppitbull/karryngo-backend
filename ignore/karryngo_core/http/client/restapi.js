"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestApi = void 0;
/**
 * @description Cette classe est un outils pour acceder a tout api Rest et est basé sur le package
 *  axios (https://www.npmjs.com/package/axios)
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
const http_1 = require("../http");
const axios_1 = __importDefault(require("axios"));
const core_decorator_1 = require("../../decorator/core.decorator");
const ActionResult_1 = require("../../utils/ActionResult");
const kresponse_1 = require("./kresponse");
const kerror_1 = require("./kerror");
let RestApi = class RestApi extends http_1.Http {
    sendRequest(request) {
        return new Promise((resolve, reject) => {
            let actionResult = new ActionResult_1.ActionResult();
            (0, axios_1.default)(request.toString())
                .then((response) => {
                actionResult.result = new kresponse_1.KResponse()
                    .status(response.status)
                    .data(response.data)
                    .statusText(response.statusText)
                    .headers(response.headers);
                resolve(actionResult);
            })
                .catch((error) => {
                console.log("Error 3", error);
                let kerror = new kerror_1.KError();
                kerror.response = new kresponse_1.KResponse()
                    .status(error.status)
                    .data(error.data)
                    .statusText(error.statusText)
                    .headers(error.headers);
                actionResult.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                reject(actionResult);
            });
        });
    }
};
RestApi = __decorate([
    (0, core_decorator_1.KarryngoCore)()
], RestApi);
exports.RestApi = RestApi;
