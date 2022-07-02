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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
@author Cedric nguendap
@description Cette classe represente le controlleur permetant l'authentification des
    demandeurs de service
@created 13/10/2020
*/
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const apiaccess_1 = require("../../../karryngo_core/security/apiaccess");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const basicauthentification_service_1 = require("../../services/authentification/basicauthentification.service");
const User_1 = require("../../services/usermanager/entities/User");
const usermanager_service_1 = require("../../services/usermanager/usermanager.service");
const customer_1 = require("./entities/customer");
const decorator_1 = require("../../../karryngo_core/decorator");
const tokentauthentification_service_1 = require("../../../karryngo_core/security/tokentauthentification.service");
let AuthRequester = class AuthRequester {
    constructor(auth, userManagerService, jwtAuth, tokenAutentification, apiAccess) {
        this.auth = auth;
        this.userManagerService = userManagerService;
        this.jwtAuth = jwtAuth;
        this.tokenAutentification = tokenAutentification;
        this.apiAccess = apiAccess;
    }
    checkUserInformation(user) {
        let status = false;
        return status;
    }
    register(request, response) {
        let user = new customer_1.Customer();
        user.hydrate(request.body);
        user.adresse.hydrate(request.body.adress);
        console.log(user);
        this.userManagerService.findUserByEmail(user.adresse.email)
            .then((data) => {
            //un utilisateur de ce nom existe déjà
            let result = new ActionResult_1.ActionResult();
            result.description = "User already exist";
            result.resultCode = ActionResult_1.ActionResult.RESSOURCE_ALREADY_EXIST_ERROR;
            result.message = "Error";
            return response.status(400).json(result);
        })
            .catch((error) => {
            if (error.resultCode == ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                //aucun utilisateur de ce nom existe dans la base de données
                this.userManagerService.newUser(user)
                    .then((result) => {
                    //opération effectué avec success
                    let r = new ActionResult_1.ActionResult();
                    r.description = "Registration successful";
                    r.result = null;
                    return response.status(201).json(r);
                })
                    .catch((error) => {
                    //response.status()
                    //echec de l'enregistrement de l'utilisateur
                    return response.status(400).json(error);
                });
            }
            else
                return response.status(500).json(error);
        });
    }
    login(request, response) {
        console.log(request.body);
        let user = new customer_1.Customer();
        user.adresse.email = request.body.email == undefined ? "" : request.body.email;
        user.password = request.body.password == undefined ? "" : request.body.password;
        let tokens = {};
        this.auth.login(user)
            .then((data) => this.jwtAuth.JWTRegister(user.adresse.email, data.result.id.toString()))
            .then((data) => {
            tokens = data.result;
            return this.tokenAutentification.setTokens({ access: tokens.token, refresh: tokens.refresh_token });
        })
            .then((data) => {
            data.description = "Authentification successful";
            data.result = tokens;
            response.status(200).json(data);
        })
            .catch((data) => {
            if (data.resultCode === ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                return response.status(403).json({
                    resultCode: data.resultCode,
                    message: "Incorrect email or password"
                });
            }
            else
                (data.resultCode === ActionResult_1.ActionResult.UNKNOW_ERROR);
            {
                return response.status(500).json({
                    resultCode: data.resultCode,
                    message: data.message
                });
            }
        });
    }
    getProfil(request, response) {
        let id = new EntityID_1.EntityID();
        id.setId(request.decoded.id);
        this.userManagerService.findUserById(id)
            .then((data) => {
            // console.log("Provider: ",data);
            return response.status(200).json({
                resultCode: data.resultCode,
                result: data.result[0].toString()
            });
        }).catch((error) => {
            return response.status(404).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    getUserProfil(request, response) {
        request.decoded.id = request.params.idProfil;
        this.getProfil(request, response);
    }
    resetPassword(request, response) {
        let user = new User_1.User();
        user.password = request.body.password;
        user.adresse.email = request.decoded.email;
        this.auth.resetPassword(user)
            .then((result) => {
            response.status(200).json({
                resultCode: result.resultCode,
                message: "password was updated successfully"
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    forgotPassword(request, response) {
        let user = new User_1.User();
        user.adresse.email = request.body.email;
        this.auth.forgotPassword(user)
            .then((result) => {
            response.status(200).json({
                resultCode: result.resultCode,
                message: "The link for reset password has been send by email"
            });
        })
            .catch((result) => {
            //console.log(result)
            if (result.resultCode === ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR) {
                return response.status(404).json({
                    resultCode: result.resultCode,
                    message: "User not found"
                });
            }
            else //(result.resultCode===ActionResult.UNKNOW_ERROR)
             {
                return response.status(500).json({
                    resultCode: result.resultCode,
                    message: result.message
                });
            }
        });
    }
    refreshToken(request, response) {
        let tokens = {};
        let token = (request.headers['x-access-token'] || request.headers['Authorization'] || request.headers['authorization']).toString();
        if (token) {
            if (token.startsWith('Bearer '))
                token = token.slice(7, token.length);
            this.tokenAutentification.getAccessTokenByRefresToken(token.toString())
                .then((data) => {
                tokens = Object.assign({}, data.result);
                let textToken = (0, jwt_decode_1.default)(tokens.access.toString());
                // console.log("Text token ", textToken)
                if (!this.tokenAutentification.isValidRefreshToken(tokens.access, textToken, tokens.date)) {
                    token = tokens.access.toString();
                    data.result = token;
                    response.status(401).json({
                        resultCode: -3,
                        message: 'Refresh token expired'
                    });
                }
                else {
                    this.apiAccess.JWTRegister(textToken['data']['email'], textToken['data']['id'])
                        .then((result) => {
                        let lastRefresh = tokens.refresh;
                        tokens = { access: result.result.token, refresh: result.result.refresh_token };
                        return this.tokenAutentification.setTokens({ access: tokens.access, refresh: tokens.refresh }, lastRefresh);
                    })
                        .then((result) => {
                        data.description = "Token refreshed with success";
                        data.result = {
                            token: tokens.access,
                            refresh_token: tokens.refresh
                        };
                        response.status(200).json(data);
                    });
                }
            })
                .catch((error) => {
                console.log("Error ", error);
                response.status(403).json({
                    resultCode: -2,
                    message: 'Bad refresh token'
                });
            });
        }
        else
            response.status(403).json({
                resultCode: -1,
                message: 'Refresh token is not supplied'
            });
    }
};
AuthRequester = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [basicauthentification_service_1.BasicAuthentificationService,
        usermanager_service_1.UserManagerService,
        apiaccess_1.ApiAccess,
        tokentauthentification_service_1.TokenAuthentification,
        apiaccess_1.ApiAccess])
], AuthRequester);
exports.default = AuthRequester;
