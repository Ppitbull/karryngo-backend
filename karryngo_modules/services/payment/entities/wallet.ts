import { KarryngoPersistentEntity } from "../../../../karryngo_core/persistence/KarryngoPersistentEntity";

export class Wallet extends KarryngoPersistentEntity
{
    amount:number=0;

    

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