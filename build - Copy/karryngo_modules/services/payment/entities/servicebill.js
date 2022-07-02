"use strict";
// import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBill = void 0;
// export class Bill extends KarryngoPersistentEntity
class ServiceBill {
    constructor() {
        this.payer = { name: "", address: "", email: "", phone: "" };
        this.payee = { name: "", address: "", email: "", phone: "" };
    }
    toString() {
        return {
            state: this.amount,
            date: this.date
        };
    }
    setTitle(title) {
        this.title = title;
    }
    setDate(date) {
        this.date = date;
    }
    setPayer(payer) {
        this.payer.name = payer.firstname + " " + payer.lastname;
        this.payer.address = payer.address.city + " " + payer.address.country;
        this.payer.email = payer.address.email;
        this.payer.phone = payer.address.phone;
    }
    setPayee(payee) {
        this.payee.name = payee.firstname + " " + payee.lastname;
        this.payee.address = payee.address.city + " " + payee.address.country;
        this.payee.email = payee.address.email;
        this.payee.phone = payee.address.phone;
    }
    setAmount(amount) {
        this.amount = amount;
    }
    setTypeService(type) {
        this.type_service = type;
    }
    setTransactionRef(ref) {
        this.transactionRef = ref;
    }
    setServiceAddress(service) {
        this.address_service = service.address;
    }
}
exports.ServiceBill = ServiceBill;
