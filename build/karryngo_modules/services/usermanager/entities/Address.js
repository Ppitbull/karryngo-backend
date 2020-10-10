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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
var KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
var EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    /**
     * @constructor
     * @param id identifiant  de l'adresse
     */
    function Address(id) {
        if (id === void 0) { id = new EntityID_1.EntityID(); }
        var _this = _super.call(this, id) || this;
        _this.email = "";
        _this.mobilePhone = "";
        _this.phone = "";
        _this.websiteLink = "";
        _this.whatsAppNumber = "";
        _this.skypeNumber = "";
        _this.zip = "";
        _this.country = "";
        return _this;
    }
    /**
     * @inheritdoc
     */
    Address.prototype.toString = function () {
        return __assign(__assign({}, _super.prototype.toString.call(this)), { email: this.email, mobilePhone: this.mobilePhone, phone: this.phone, websiteLink: this.websiteLink, whatsAppNumber: this.whatsAppNumber, skypeNumber: this.skypeNumber, zip: this.zip, country: this.country });
    };
    /**
     * @inheritdoc
     */
    Address.prototype.hydrate = function (entity) {
        _super.prototype.hydrate.call(this, entity);
        this.email = this.purgeAttribute(entity, "email");
        this.mobilePhone = this.purgeAttribute(entity, "mobilePhone");
        this.phone = this.purgeAttribute(entity, "phone");
        this.websiteLink = this.purgeAttribute(entity, "websiteLink");
        this.whatsAppNumber = this.purgeAttribute(entity, "whatsAppNumber");
        this.skypeNumber = this.purgeAttribute(entity, "skypeNumber");
        this.zip = this.purgeAttribute(entity, "zip");
        this.country = this.purgeAttribute(entity, "country");
    };
    return Address;
}(KarryngoPersistentEntity_1.KarryngoPersistentEntity));
exports.Address = Address;
