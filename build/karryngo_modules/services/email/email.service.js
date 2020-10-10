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
exports.EmailService = void 0;
var karryngo_service_1 = require("../../karryngo.service");
var EmailService = /** @class */ (function (_super) {
    __extends(EmailService, _super);
    function EmailService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailService.prototype.send = function (email) {
        return new Promise(function (resolve, reject) {
        });
    };
    return EmailService;
}(karryngo_service_1.KarryngoService));
exports.EmailService = EmailService;
