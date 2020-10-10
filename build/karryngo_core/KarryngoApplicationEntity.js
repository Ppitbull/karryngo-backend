"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.KarryngoApplicationEntity = void 0;
/**
@author: Cedric nguendap
@description: Cette classe represente la classe de base de toute classe de la
    logique applicative (qui n'est pas une classe persistante)
@created: 21/09/2020
 @see Serializable Entity
*/
var KarryngoEntity_1 = require("./KarryngoEntity");
var KarryngoApplicationEntity = /** @class */ (function (_super) {
    __extends(KarryngoApplicationEntity, _super);
    function KarryngoApplicationEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return KarryngoApplicationEntity;
}(KarryngoEntity_1.KarryngoEntity));
exports.KarryngoApplicationEntity = KarryngoApplicationEntity;
