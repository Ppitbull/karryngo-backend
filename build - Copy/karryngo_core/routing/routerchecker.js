"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterChecker = void 0;
const core_decorator_1 = require("../decorator/core.decorator");
const KarryngoApplicationEntity_1 = require("../KarryngoApplicationEntity");
const apiaccess_1 = require("../security/apiaccess");
let RouterChecker = class RouterChecker extends KarryngoApplicationEntity_1.KarryngoApplicationEntity {
    constructor(apiAccess) {
        super();
        this.apiAccess = apiAccess;
    }
    toString() {
        throw new Error("Method not implemented.");
    }
    hydrate(entity) {
        throw new Error("Method not implemented.");
    }
    checkApiAccess(token) {
        return this.apiAccess.JWTLogin(token);
    }
    //pour s'asssurer que l'url existe
    checkMethod() {
    }
    /**
     * @description cette methode permet de verifier l'acces a l'api en se basant sur le token si une erreur
     *  une authentification est requise
     * @param route route en cours de traitement
     * @param method method que l'on désire exécuter
     * @param req objet representant la requete de l'utilisateur
     * @param res objet representant la reponse a retourner a l'utilisateur
     * @param {Function} next si tout est ok l'appel a cette fonction permet de poursuivre le t
     *  traitement de la requete
     */
    checkSecurity(route, action, req, res, next) {
        //si la route spécifi d'utiliser une authentification
        if (action.isSecure()) {
            //recuperationj du token dans l'entête
            let token = req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
            //si le token existe on le traite sinon on retoune un objet d'érreure
            if (token) {
                if (token.startsWith('Bearer '))
                    token = token.slice(7, token.length);
                this.checkApiAccess(token)
                    .then((data) => {
                    console.log("decoded ", JSON.parse(data.result.data));
                    req.decoded = JSON.parse(data.result.data);
                    next();
                })
                    .catch((data) => {
                    let message = "";
                    switch (data.message) {
                        case apiaccess_1.ApiAccessError.JsonWebTokenError:
                            message = data.description;
                            data.resultCode = -2;
                            break;
                        case apiaccess_1.ApiAccessError.TokenExpiredError:
                            message = "Token expired";
                            data.resultCode = -3;
                    }
                    ;
                    return res.status(401).json({
                        resultCode: data.resultCode,
                        message
                    });
                });
            }
            else
                return res.status(403).json({
                    resultCode: -1,
                    message: 'Auth token is not supplied'
                });
        }
        else {
            next();
        }
    }
};
RouterChecker = __decorate([
    (0, core_decorator_1.KarryngoCore)(),
    __metadata("design:paramtypes", [apiaccess_1.ApiAccess])
], RouterChecker);
exports.RouterChecker = RouterChecker;
