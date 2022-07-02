// import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

import { User } from "../../usermanager/entities/User";
// export class Bill extends KarryngoPersistentEntity

export class ServiceBill
{
    idRequester: String;
    idSelectedProvider: String;
    idSelectedTransaction: String;
    service: String;

    title: String;
    paymentMethod: String;
    payer: {
        name: String;
        address: String;
        email: String;
        phone: String;
    } = {name:"", address:"", email:"", phone:""}
    payee: {
        name: String;
        address: String;
        email: String;
        phone: String;
    } = {name:"", address:"", email:"", phone:""}
    items: {name: String, quantity: number, price: number}[];
    date: Date;
    amount:number;
    type_service: String;
    address_service: any;
    transactionRef: String;

    toString():Record<string,any>
    {
        return {
            state:this.amount,
            date:this.date
        }
    }

    setTitle(title){
        this.title = title;
    }

    setDate(date){
        this.date = date;
    }

    setPayer(payer){
        this.payer.name = payer.firstname + " " + payer.lastname;
        this.payer.address = payer.address.city + " " + payer.address.country;
        this.payer.email = payer.address.email;
        this.payer.phone = payer.address.phone;
    }

    setPayee(payee){
        this.payee.name = payee.firstname + " " + payee.lastname;
        this.payee.address = payee.address.city + " " + payee.address.country;
        this.payee.email = payee.address.email;
        this.payee.phone = payee.address.phone;
    }


    setAmount(amount){
        this.amount = amount;
    }

    setTypeService(type){
        this.type_service = type;
    }

    setTransactionRef(ref){
        this.transactionRef = ref;
    }

    setServiceAddress(service){
        this.address_service = service.address
    }


}