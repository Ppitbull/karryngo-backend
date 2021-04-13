import { Customer } from "./customer";
import { CompagnyServiceProvider } from "./companyserviceprovider";
import { ServiceProvider } from "./serviceprovider";
import { CompagnyServiceRequester } from "./companyservicerequester";
import { ServiceRequester } from "./servicerequester";

export class UserFactory
{
    static getInstance(user:Record<string,any>):Customer
    {
        let cus:Customer;
        if(user.isProvider) 
        {
            if(user.isCompany) cus=new CompagnyServiceProvider();
            else cus=new ServiceProvider();
        }
        else 
        {
            if(user.isCompany) cus=new CompagnyServiceRequester();
            else cus=new ServiceRequester();
        }
        cus.hydrate(user);
        return cus;
    }
}