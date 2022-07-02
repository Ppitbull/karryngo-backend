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
exports.GDistanceMatrice = void 0;
const decorator_1 = require("../../../karryngo_core/decorator");
const restapi_1 = require("../../../karryngo_core/http/client/restapi");
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
let GDistanceMatrice = class GDistanceMatrice {
    constructor(request) {
        this.request = request;
        this.configMap = {};
        this.configMap = {
            key: this.configService.getValueOf("googleapis").apikey
        };
    }
    getDistanceBeetween(a, b, transportType) {
        let r = new ActionResult_1.ActionResult();
        r.result = [];
        return new Promise((resolve, reject) => {
            // this.request
            // .request()
            // .get("https://maps.googleapis.com/maps/api/distancematrix/json",
            //     { 
            //         params: { 
            //             key: this.configMap.key 
            //         } 
            //     }
            // )
            // .then((result:any)=>{
            //         let data=result.data.json;
            //         if(data.status!="OK")
            //         {
            //             r.resultCode=ActionResult.UNKNOW_ERROR
            //             r.result=data.error_message;
            //             reject(r);
            //             return;
            //         }
            //         if(data.rows.length>0) r.result=[data.rows[0].element];
            //     resolve(r);
            // })
            // .catch((error:any)=>{
            //     r.resultCode=ActionResult.UNKNOW_ERROR;
            //     r.result=error;
            // })
        });
    }
};
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], GDistanceMatrice.prototype, "configService", void 0);
GDistanceMatrice = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [restapi_1.RestApi])
], GDistanceMatrice);
exports.GDistanceMatrice = GDistanceMatrice;
