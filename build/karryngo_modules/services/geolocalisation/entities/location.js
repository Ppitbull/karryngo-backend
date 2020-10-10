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
exports.Location = void 0;
/**
@author: Cedric Nguendap
@description: Cette classe permet represente une zone de géolocalisation
@created: 10/10/2020
*/
var KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
var EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location(id, name, longitude, latitude) {
        if (id === void 0) { id = new EntityID_1.EntityID(); }
        if (name === void 0) { name = ""; }
        if (longitude === void 0) { longitude = 0.0; }
        if (latitude === void 0) { latitude = 0.0; }
        var _this = _super.call(this, id) || this;
        /**
         * @description represente le nom de la localisaton
         * @type String
         */
        _this.name = "";
        /**
         * @description represente la latitude de la zone
         * @type Number (Double)
         */
        _this.latitude = 0.0;
        /**
         * @description represente la longitude de la zone
         * @type Number (Double)
         */
        _this.longitude = 0.0;
        _this.longitude = longitude;
        _this.latitude = latitude;
        _this.name = name;
        return _this;
    }
    /**
     * @inheritdoc
     */
    Location.prototype.toString = function () {
        return __assign(__assign({}, _super.prototype.toString.call(this)), { "longitude": this.longitude, "latitude": this.latitude, "name": this.name });
    };
    Location.prototype.hydrate = function (entity) {
        _super.prototype.hydrate.call(this, entity);
        this.longitude = this.purgeAttribute(entity, "longitude");
        this.latitude = this.purgeAttribute(entity, "latitude");
        this.name = this.purgeAttribute(entity, "name");
    };
    return Location;
}(KarryngoPersistentEntity_1.KarryngoPersistentEntity));
exports.Location = Location;
