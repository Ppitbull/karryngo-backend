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
exports.KarryngoService = void 0;
var KarryngoApplicationEntity_1 = require("../karryngo_core/KarryngoApplicationEntity");
var KarryngoService = /** @class */ (function (_super) {
    __extends(KarryngoService, _super);
    function KarryngoService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KarryngoService.prototype.toString = function () {
        throw new Error("Method not implemented.");
    };
    KarryngoService.prototype.hydrate = function (entity) {
        throw new Error("Method not implemented.");
    };
    return KarryngoService;
}(KarryngoApplicationEntity_1.KarryngoApplicationEntity));
exports.KarryngoService = KarryngoService;
