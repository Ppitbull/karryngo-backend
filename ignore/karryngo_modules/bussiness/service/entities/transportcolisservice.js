"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de transport pour les colis
@created 30/11/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportColisService = void 0;
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const receivercolis_1 = require("./receivercolis");
const transportservicetype_1 = require("./transportservicetype");
class TransportColisService extends transportservicetype_1.TransportServiceType {
    constructor() {
        super(...arguments);
        this.is_weak = false;
        this.typeof = "colis";
        this.size_heigth = 0.0;
        this.size_depth = 0.0;
        this.size_width = 0.0;
        this.size_piece_nber = 0;
        this.package_name = "";
        this.receiver = new receivercolis_1.ReceiverColis(new EntityID_1.EntityID());
    }
    hydrate(entity) {
        super.hydrate(entity);
        let options = this.purgeAttribute(entity, "options");
        this.is_weak = this.purgeAttribute(options, "is_weak");
        this.package_name = this.purgeAttribute(options, "package_name");
        if (options.hasOwnProperty('size')) {
            this.size_heigth = this.purgeAttribute(options.size, "heigth");
            this.size_depth = this.purgeAttribute(options.size, "depth");
            this.size_width = this.purgeAttribute(options.size, "width");
            this.size_piece_nber = this.purgeAttribute(options.size, "piece_nber");
        }
        this.receiver.hydrate(options.receiver);
        this.receiver.id = this.receiver.id == null ? new EntityID_1.EntityID() : this.receiver.id;
    }
    /**
     * @inheritdoc
     */
    toString() {
        let stringifyO = super.toString();
        stringifyO["options"] = Object.assign(Object.assign({}, stringifyO["options"]), { is_weak: this.is_weak, typeof: this.typeof, size: {
                heigth: this.size_heigth,
                depth: this.size_heigth,
                width: this.size_width,
                piece_nber: this.size_piece_nber
            }, package_name: this.package_name, receiver: this.receiver.toString() });
        stringifyO["type"] = TransportColisService.TYPE;
        return stringifyO;
    }
}
exports.TransportColisService = TransportColisService;
TransportColisService.TYPE = "TransportColisService";
