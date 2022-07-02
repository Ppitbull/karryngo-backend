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
exports.TokenAuthentification = void 0;
const decorator_1 = require("../decorator");
const KarryngoPersistentEntity_1 = require("../persistence/KarryngoPersistentEntity");
const ActionResult_1 = require("../utils/ActionResult");
const apiaccess_1 = require("./apiaccess");
class Tokens extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor() {
        super(...arguments);
        this.access = "";
        this.refresh = "";
    }
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { access: this.access, refresh: this.refresh });
    }
}
let TokenAuthentification = class TokenAuthentification {
    constructor(apiAccess) {
        this.apiAccess = apiAccess;
        this.tokenStorage = new Map();
    }
    getAccessTokenByRefresToken(refreshToken) {
        return new Promise((resolve, reject) => {
            // this.db.findInCollection(Configuration.collections.tokens,{refresh:refreshToken})
            // .then((data:ActionResult)=>{
            //     if(data.result.length==0) 
            //     {
            //         data.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            //         reject(data);
            //     }
            //     else 
            //     {
            //         data.result=data.result[0];
            //         resolve(data);
            //     }
            // })
            let result = new ActionResult_1.ActionResult();
            if (this.tokenStorage.has(refreshToken)) {
                result.result = Object.assign(Object.assign({}, this.tokenStorage.get(refreshToken)), { refresh: refreshToken });
                return resolve(result);
            }
            result.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            reject(result);
        });
    }
    isValidRefreshToken(refreshToken, textToken, dateCreated) {
        let now = new Date();
        let tokenDate = new Date(dateCreated);
        // console.log("Date ",now,tokenDate,textToken)
        tokenDate.setHours(tokenDate.getSeconds() + this.configService.getValueOf("jwt").refresh_timeout);
        if (tokenDate < now)
            return false;
        return true;
    }
    setTokens(tokens, lastRefresh = "") {
        // let newToken=new Tokens();
        // newToken.access=tokens.access;
        // newToken.refresh=tokens.refresh
        // return this.db.addToCollection(Configuration.collections.tokens,newToken)
        return new Promise((resolve, reject) => {
            this.tokenStorage.delete(lastRefresh);
            this.tokenStorage.set(tokens.refresh, { access: tokens.access, date: new Date().toISOString() });
            resolve(new ActionResult_1.ActionResult());
        });
    }
    updateToken(refreshToken, newToken) {
        // return this.db.updateInCollection(Configuration.collections.tokens,{refresh:refreshToken},{access:newToken});
        return new Promise((resolve, reject) => {
            if (this.tokenStorage.has(refreshToken)) {
                this.tokenStorage.set(refreshToken, { access: newToken, date: new Date().toISOString() });
                return resolve(new ActionResult_1.ActionResult());
            }
            let error = new ActionResult_1.ActionResult();
            error.resultCode = ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR;
            reject(error);
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], TokenAuthentification.prototype, "db", void 0);
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], TokenAuthentification.prototype, "configService", void 0);
TokenAuthentification = __decorate([
    (0, decorator_1.KarryngoCore)(),
    __metadata("design:paramtypes", [apiaccess_1.ApiAccess])
], TokenAuthentification);
exports.TokenAuthentification = TokenAuthentification;
