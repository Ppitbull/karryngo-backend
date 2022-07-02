"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente la classe de base d'un type de service (Personne ou colis)
@created 30/11/2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportServiceType = exports.TransportServiceTypeState = void 0;
const KarryngoPersistentEntity_1 = require("../../../../karryngo_core/persistence/KarryngoPersistentEntity");
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const location_1 = require("../../../services/geolocalisation/entities/location");
const transactionservice_1 = require("./transactionservice");
const vehicle_1 = require("./vehicle");
var TransportServiceTypeState;
(function (TransportServiceTypeState) {
    TransportServiceTypeState["SERVICE_INIT_STATE"] = "service_init_state";
    TransportServiceTypeState["SERVICE_IN_DISCUSS_STATE"] = "service_in_discuss_state";
    TransportServiceTypeState["SERVICE_IN_TRANSACTION_STATE"] = "service_in_transaction_state";
    TransportServiceTypeState["SERICE_END"] = "service_end";
})(TransportServiceTypeState = exports.TransportServiceTypeState || (exports.TransportServiceTypeState = {}));
class TransportServiceType extends KarryngoPersistentEntity_1.KarryngoPersistentEntity {
    constructor(id = new EntityID_1.EntityID(), is_urgent = false, details = "", images = [], from = new location_1.Location(), to = new location_1.Location()) {
        super(id);
        this.carTypeList = [];
        this.date = "";
        this.date_departure = "";
        this.date_arrival = "";
        this.title = "";
        this.suggestedPrice = "0";
        this.state = TransportServiceTypeState.SERVICE_INIT_STATE;
        this.idRequester = "";
        this.idSelectedProvider = "";
        this.idSelectedTransaction = "";
        this.providers = [];
        this.transactions = [];
        this.is_urgent = is_urgent;
        this.description = details;
        this.images = images;
        this.from = from;
        this.to = to;
        //hydrate date iso 8601
        this.date = (new Date()).toISOString();
    }
    /**
     * @inheritdoc
     */
    hydrate(entity) {
        this._id = this.purgeAttribute(entity, '_id');
        let options = this.purgeAttribute(entity, "options");
        this.is_urgent = this.purgeAttribute(options, "is_urgent");
        this.description = this.purgeAttribute(entity, "description");
        this.images = this.purgeAttribute(entity, "images");
        if (this.purgeAttribute(options, "vehicle")) {
            this.carTypeList = this.purgeAttribute(options, "vehicle").map((v) => {
                let veh = new vehicle_1.Vehicle();
                veh.hydrate(v);
                return veh;
            });
        }
        ;
        this.state = this.purgeAttribute(entity, "state");
        this.suggestedPrice = this.purgeAttribute(entity, "suggestedPrice");
        let adresse = this.purgeAttribute(entity, "address");
        this.from.hydrate(this.purgeAttribute(adresse, "from"));
        this.to.hydrate(this.purgeAttribute(adresse, "to"));
        if (this.to.id == null)
            this.to.id = new EntityID_1.EntityID();
        let deadline = this.purgeAttribute(entity, "deadline");
        if (deadline) {
            this.date_departure = this.purgeAttribute(deadline, "departure");
            this.date_arrival = this.purgeAttribute(deadline, "arrival");
        }
        this.date = this.purgeAttribute(entity, "publicationDate") ? this.purgeAttribute(entity, "publicationDate") : this.date;
        this.title = this.purgeAttribute(entity, "title");
        this.idRequester = this.purgeAttribute(entity, "idRequester");
        this.idSelectedProvider = this.purgeAttribute(entity, "idSelectedProvider");
        this.idSelectedTransaction = this.purgeAttribute(entity, "idSelectedTransaction");
        if (entity.providers) {
            this.providers = this.purgeAttribute(entity, "providers");
        }
        if (entity.transactions) {
            this.transactions = entity.transactions.map((trans) => {
                let transaction = new transactionservice_1.TransactionService(trans.id);
                transaction.hydrate(trans);
                return transaction;
            });
        }
        // console.log('entity ',entity)
    }
    /**
     * @inheritdoc
     */
    toString() {
        return Object.assign(Object.assign({}, super.toString()), { address: {
                from: this.from.toString(),
                to: this.to.toString(),
            }, publicationDate: this.date, deadline: {
                departure: this.date_departure,
                arrival: this.date_arrival
            }, options: {
                vehicle: this.carTypeList.map((vehicle) => vehicle.toString()),
                is_urgent: this.is_urgent,
                description: this.description,
                images: this.images,
            }, title: this.title, suggestedPrice: this.suggestedPrice, state: this.state, idRequester: this.idRequester, idSelectedProvider: this.idSelectedProvider, idSelectedTransaction: this.idSelectedTransaction, providers: this.providers, transactions: this.transactions.map((trans) => trans.toString()) });
        //stringify date format ISO 8601
    }
}
exports.TransportServiceType = TransportServiceType;
