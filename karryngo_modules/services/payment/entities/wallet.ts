import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class Wallet extends KarryngoPersistentEntity
{
    amount:number=0;

    

    constructor(data) {  // Constructor
        super();
        this.id = data._id;
        this.amount = data.amount;
    }

    toString():Record<string,any>
    {
        return {
            ...super.toString(),
            amount:this.amount
        }
    }

    increase(amount:number):boolean
    {
        if(amount<0) return false;
        this.amount+=amount;
        return true;
    }

    decrease(amount:number)
    {
        if(amount<0 || amount>this.amount) return false;
        this.amount-=amount;
        return true;
    }

}