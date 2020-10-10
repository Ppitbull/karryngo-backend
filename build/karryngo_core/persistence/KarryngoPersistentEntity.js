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
exports.KarryngoPersistentEntity = void 0;
var KarryngoEntity_1 = require("../KarryngoEntity");
var KarryngoPersistentEntity = /** @class */ (function (_super) {
    __extends(KarryngoPersistentEntity, _super);
    function KarryngoPersistentEntity(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        return _this;
    }
    /**
     * @description Cette methode permet de verifier l'existance d'un valeur dans un fichier de configuration
     *  un objet JSON afin de retourner sa valeur. cela évite des erreurs du a la tentative
     *  d'accés a un attribue non contenu dans l'objet JSON
     * @param object objet au format JSON
     * @param attr attribue dont on veu la valeur
     * @return null si l'attribut n'exite pas et sa valeur dans le cas contraire
     */
    KarryngoPersistentEntity.prototype.purgeAttribute = function (object, attr) {
        return object.hasOwnProperty(attr) ? object[attr] : null;
    };
    /**
     * @inheritdoc
     */
    KarryngoPersistentEntity.prototype.hydrate = function (entity) {
        this.id = this.purgeAttribute(entity, "id");
    };
    /**
     * @inheritdoc
     */
    KarryngoPersistentEntity.prototype.toString = function () {
        return {
            id: this.id
        };
    };
    return KarryngoPersistentEntity;
}(KarryngoEntity_1.KarryngoEntity));
exports.KarryngoPersistentEntity = KarryngoPersistentEntity;
