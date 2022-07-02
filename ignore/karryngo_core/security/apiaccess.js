"use strict";
/**
@author Cedric nguendap
@description Cette classe présente le service d'authentification basé sur le JWT
@created 18/10/2020
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiAccess = exports.ApiAccessError = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rand_token_1 = require("rand-token");
const decorator_1 = require("../decorator");
const ActionResult_1 = require("../utils/ActionResult");
var ApiAccessError;
(function (ApiAccessError) {
    ApiAccessError["JsonWebTokenError"] = "JsonWebTokenError";
    ApiAccessError["TokenExpiredError"] = "TokenExpiredError";
})(ApiAccessError = exports.ApiAccessError || (exports.ApiAccessError = {}));
let ApiAccess = class ApiAccess {
    /**
     * @description permet de vérifier l'existance d'un token parmis l'ensemble des tokens
     *  stocké. si le token est trouvé alors il est dechiffer et retourner
     * @param token token dont on veu vérifier l'existance
     * @return {ActionResult} un resultat de success est retourné (muni du token déchiffer)
     *  si tout ce passe bien et un resultat d'échec dans le cas contraire
     */
    JWTLogin(token) {
        return this.textFromJWT(token);
    }
    /**
     * @description permet de générer et retourner un token uitilisable par l'utilisateur. ce token
     *  est également concerver
     * @param user utilisateur dont on veut sauvegarder le token
     * @return {ActionResult}  un resultat de success est retourné si tout ce passe bien.
     *  ce resultat est accompagné d'un token a utiliser pendans un nombre de temps configurer
     *  dans le fichier de configuration
     */
    JWTRegister(email, id) {
        return this.textToJWT(JSON.stringify({ email, id }));
    }
    textToJWT(data) {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            jsonwebtoken_1.default.sign({
                exp: Math.floor(Date.now() / 1000) + this.configService.getValueOf("jwt").timeout,
                data
            }, this.configService.getValueOf('jwt').secret_key, {
                algorithm: this.configService.getValueOf('jwt').algorithm,
            }, (err, token) => {
                // console.log("jwt ",this.configService.getValueOf("jwt"),"data ",token,"error ",err);
                if (err) {
                    result.message = err.name;
                    result.description = err.message;
                    result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                    result.description = err;
                    reject(result);
                }
                else {
                    result.result = { token, refresh_token: (0, rand_token_1.uid)(256) };
                    resolve(result);
                }
            });
        });
    }
    textFromJWT(token) {
        return new Promise((resolve, reject) => {
            let result = new ActionResult_1.ActionResult();
            jsonwebtoken_1.default.verify(token.toString(), this.configService.getValueOf("jwt").secret_key, {
                algorithms: [this.configService.getValueOf("jwt").algorithm]
            }, (err, decoded) => {
                if (err) {
                    result.message = `${err.name}`;
                    result.description = err.message;
                    result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    reject(result);
                }
                else {
                    result.result = decoded;
                    resolve(result);
                }
            });
        });
    }
};
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], ApiAccess.prototype, "configService", void 0);
ApiAccess = __decorate([
    (0, decorator_1.KarryngoCore)()
], ApiAccess);
exports.ApiAccess = ApiAccess;
