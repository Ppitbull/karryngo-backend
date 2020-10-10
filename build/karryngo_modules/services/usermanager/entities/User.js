"use strict";
/**
@author: Cedric nguendap
@description: Cette classe permet represente un utilisateur du systéme
@created: 09/10/2020
*/
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
exports.User = void 0;
var KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
var EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
var location_1 = require("../../geolocalisation/entities/location");
var Address_1 = require("./Address");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(_id, fname, lname, pwd, add, locations) {
        if (_id === void 0) { _id = new EntityID_1.EntityID(); }
        if (fname === void 0) { fname = ""; }
        if (lname === void 0) { lname = ""; }
        if (pwd === void 0) { pwd = ""; }
        if (add === void 0) { add = new Address_1.Address(); }
        if (locations === void 0) { locations = []; }
        var _this = _super.call(this, _id) || this;
        /**
         * @description nom de l'utilisateur
         * @type String
         */
        _this.firstname = "";
        /**
         * @description prenom de l'utilisateur
         * @type String
         */
        _this.lastname = "";
        /**
         * @description mot de passe de l'utilisateur
         * @type String
         */
        _this.password = "";
        _this.locations = [];
        _this.firstname = fname;
        _this.lastname = lname;
        _this.password = pwd;
        _this.adresse = add;
        _this.locations = locations;
        return _this;
    }
    /**
     * @inheritdoc
     */
    User.prototype.toString = function () {
        return __assign(__assign({}, _super.prototype.toString.call(this)), { "firstname": this.firstname, "lastname": this.lastname, "password": this.password, "adresse": this.adresse.toString(), "locations": this.locations.map(function (zone) { return zone.toString(); }) });
    };
    /**
     * @inheritdoc
     */
    User.prototype.hydrate = function (entity) {
        _super.prototype.hydrate.call(this, entity);
        this.firstname = this.purgeAttribute(entity, "firstname");
        this.lastname = this.purgeAttribute(entity, "lastname");
        this.password = this.purgeAttribute(entity, "password");
        this.adresse.hydrate(entity);
        this.locations = this.purgeAttribute(entity, "locations") == null
            ? []
            : this.purgeAttribute(entity, "locations").map(function (zone) {
                var local = new location_1.Location();
                local.hydrate(zone);
                return local;
            });
    };
    return User;
}(KarryngoPersistentEntity_1.KarryngoPersistentEntity));
exports.User = User;
